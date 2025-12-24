# Api requests

## 1. Kỹ thuật làm việc với các thư viện quản lý remote state

- Query:
  - Lấy data từ cache nếu có, nếu không có thì fetch từ server
- Mutation:
  - Gửi request lên server
  - Trước khi gửi request:
    - Có thể cập nhật trước data vào cache để hiển thị tạm thời (optimistic update)
  - Sau khi nhận được response:
    - Báo là cache cũ không còn hợp lệ (invalid) để refetch data
    - (Hoặc) cập nhật trực tiếp cache với data mới
    - (Hoặc) không làm gì cả nếu không cần thiết/đã cập nhật trước đó
- Error handling:
  - Hiển thị thông báo lỗi nếu request thất bại

## 2. Phân tích Server APIs

- **Dựa vào bộ API để generate ra các API requests tương ứng**.
- **Phân tích nghiệp vụ để xử lý các remote state sau khi API được gọi**.
- Bộ APIs thường sẽ có cấu trúc:
  - Phần API requests thường
    - Phần chung:
      - Auth (mutation)
    - Phần riêng theo từng app (Dựa vào API spec của từng app, ví dụ ở đây là Threads):
      - Search (query)

  - Phần API requests quản lý remote state
    - Phần chung:
      - User (query và mutation)
    - Phần riêng theo từng app (Dựa vào API spec của từng app, ví dụ ở đây là Threads):
      - Posts (query và mutation)
      - Post Interactions (mutation)
      - User Actions (mutation)

## 3. Custom baseQuery với http request đã thiết kế

### 3.1. Cấu trúc thư mục

```/src
  /services
    /baseQuery.js
```

### 3.2. Chi tiết baseQuery.js

```javascript
// src/services/baseQuery.js
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import httpRequest from "@/utils/httpRequest"; // <-- Axios Client đã cấu hình Interceptor

// Hàm chuyển đổi Axios thành BaseQueryFn
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, ...rest }) => {
    try {
      const result = await httpRequest({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        ...rest,
      });
      return { data: result.data }; // Trả về data (result.data nếu httpRequest trả về response object)
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
```

## 3. Thiết kế API Requests

### 3.1. Cấu trúc files

```
/src
  /services
    /auth
      authApi.js
    /search
      searchApi.js
    /user
      userApi.js
    /posts
      postsApi.js
    /postInteractions
      postInteractionsApi.js
    /userActions
      userActionsApi.js
```

### 3.2. Chi tiết từng loại API request

#### 3.2.1. Chi tiết về authApi

- File: authApi.js

```javascript
// src/services/auth/authApi.js
import { axiosBaseQuery } from "@/services/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "UserColumns"],
  endpoints: (builder) => ({
    // API Public
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),

    // API Protected
    getUserInfo: builder.query({
      query: () => ({
        // Chỉ cần path tương đối từ Base URL gốc: /api/auth/user
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // ...
  }),
});
```

- Các component sử dụng 2 API trên:
  - Component Login sử dụng mutation login để gửi thông tin đăng nhập lên server.

```javascript
// src/components/Login.jsx
import React, { useState } from "react";
import { useLoginMutation } from "../services/auth/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
import { useSearchParams, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessRedirect, setIsSuccessRedirect] = useState(false);

  // 1. Lấy query params từ URL (ví dụ: ?continue=/profile)
  const [searchParams] = useSearchParams();
  const continueUrl = searchParams.get("continue") || "/"; // Mặc định là trang chủ

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ login: email, password }).unwrap();

      // Lưu token
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);

      // Cập nhật Redux
      dispatch(setAuth(true));

      // 2. Kích hoạt chuyển hướng sau khi xử lý xong mọi logic
      setIsSuccessRedirect(true);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // 3. Sử dụng Navigate để chuyển hướng sau khi đăng nhập thành công
  if (isSuccessRedirect) {
    return <Navigate to={continueUrl} replace />;
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-6 shadow">
      <h3 className="mb-4 text-xl font-bold">Đăng nhập</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email/Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 block w-full rounded border p-2"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 block w-full rounded border p-2"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {isLoading ? "Đang xác thực..." : "Đăng nhập"}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error.data?.message || "Sai thông tin đăng nhập!"}
        </p>
      )}

      {continueUrl !== "/" && (
        <p className="mt-4 text-xs text-gray-500 italic">
          * Bạn sẽ được chuyển hướng về: {continueUrl} sau khi đăng nhập.
        </p>
      )}
    </div>
  );
};

export default Login;
```

- Component Profile sử dụng query getUserInfo để lấy thông tin người dùng đã đăng nhập.

```javascript
// src/components/Profile.jsx
import React from "react";
import { useGetUserInfoQuery } from "../services/auth/authApi";
import { useSelector } from "react-redux";

const Profile = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  // RTK Query tự động fetch khi component mount nếu skip: false
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserInfoQuery(undefined, {
    skip: !isAuth, // Chỉ gọi API khi đã xác thực ở client
  });

  if (!isAuth) return <p>Vui lòng đăng nhập để xem thông tin.</p>;
  if (isLoading) return <p>Đang tải thông tin cá nhân...</p>;
  if (isError)
    return <p className="text-red-500">Không thể lấy thông tin người dùng.</p>;

  return (
    <div className="rounded bg-gray-100 p-4">
      <h3>Hồ sơ người dùng</h3>
      <div className="flex items-center gap-4">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt="Avatar"
            className="h-16 w-16 rounded-full"
          />
        )}
        <div>
          <p>
            <strong>Tên:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Username:</strong> @{user?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
```

#### 3.2.2. Chi tiết file searchApi.js

- Tương tự 3.2.1.

#### 3.2.3. Chi tiết file userApi.js

- Có thể gộp vào authApi (như trên).

#### 3.2.4. Chi tiết postsApi

- File postsApi.js

```javascript
// src/services/posts/postsApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/baseQuery";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Post", "Feed", "Reply"],
  endpoints: (builder) => ({
    // Lấy danh sách bài viết (Feed)
    getFeed: builder.query({
      query: (params) => ({
        url: "/posts/feed",
        method: "GET",
        params, // type, page, per_page
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Feed", id })), "Feed"]
          : ["Feed"],
    }),

    // Lấy chi tiết 1 bài viết
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Tạo bài viết mới
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Feed"], // Làm mới Feed để thấy bài viết mới
    }),

    // Cập nhật bài viết (Sử dụng phương thức POST với _method PUT cho multipart)
    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: "POST",
        data: formData, // Chứa _method: "PUT"
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        "Feed",
      ],
    }),

    // Xóa bài viết
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "POST",
        data: { _method: "DELETE" },
      }),
      invalidatesTags: ["Feed"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
```

- Component Home sử dụng getFeed để hiển thị danh sách bài viết (chưa áp dụng infinite scroll và chưa xử lý post interactions cho từng bài viết).

```javascript
// src/components/Home.jsx
import React from "react";
import { useGetFeedQuery } from "../services/posts/postsApi";
import { Link } from "react-router-dom";

const Home = () => {
  // Gọi API lấy feed "Dành cho bạn"
  const { data, isLoading, isError, refetch } = useGetFeedQuery({
    type: "for_you",
    page: 1,
    per_page: config.PAGINATION.DEFAULT_LIMIT || 10,
  });

  if (isLoading)
    return <div className="p-4 text-center">Đang tải bảng tin...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Không thể tải dữ liệu.</div>
    );

  const posts = data?.data || [];

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bảng tin</h2>
        <button
          onClick={() => refetch()}
          className="rounded bg-gray-200 px-3 py-1 text-sm"
        >
          Làm mới
        </button>
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border p-4 shadow-sm transition hover:shadow-md"
            >
              <Link to={`/posts/${post.id}`} className="block">
                <p className="mb-2 text-gray-800">{post.content}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>❤️ {post.likes_count} lượt thích</span>
                  <span>💬 {post.replies_count} phản hồi</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
```

#### 3.2.5. Chi tiết postInteractionsApi

- File postInteractionsApi.js

```javascript
// src/services/postInteractions/postInteractionsApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/baseQuery";
import { postsApi } from "../posts/postsApi"; // Import để can thiệp cache

export const postInteractionsApi = createApi({
  reducerPath: "postInteractionsApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Like Post với Optimistic Update
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // BƯỚC 1: Cập nhật lạc quan trong cache của getFeed và getSinglePost
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getSinglePost", id, (draft) => {
            // Giả sử server trả về flag is_liked_by_auth và likes_count
            if (draft) {
              draft.is_liked_by_auth = !draft.is_liked_by_auth;
              draft.likes_count += draft.is_liked_by_auth ? 1 : -1;
            }
          }),
        );

        try {
          // Đợi kết quả thực từ server
          await queryFulfilled;
        } catch {
          // BƯỚC 2: Nếu API lỗi, rollback lại dữ liệu cũ
          patchResult.undo();

          // Có thể thêm thông báo lỗi toast tại đây
          console.error("Like failed, rolling back...");
        }
      },
    }),

    // Repost với Optimistic Update
    repost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/repost`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getSinglePost", id, (draft) => {
            if (draft) {
              draft.is_reposted_by_auth = !draft.is_reposted_by_auth;
              draft.reposts_count += draft.is_reposted_by_auth ? 1 : -1;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Save Post
    savePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/save`,
        method: "POST",
      }),
    }),

    // Report Post (Cần truyền lý do)
    reportPost: builder.mutation({
      query: ({ id, reason, description }) => ({
        url: `/posts/${id}/report`,
        method: "POST",
        data: { reason, description },
      }),
    }),
  }),
});

export const {
  useLikePostMutation,
  useRepostMutation,
  useSavePostMutation,
  useReportPostMutation,
} = postInteractionsApi;
```

- Component PostDetail sử dụng likePost mutation với optimistic update.

```javascript
// src/components/PostDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSinglePostQuery } from "../services/posts/postsApi";
import { useLikePostMutation } from "../services/postInteractions/postInteractionsApi";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Lấy chi tiết bài viết
  const { data: post, isLoading, isError } = useGetSinglePostQuery(id);

  // 2. Sử dụng mutation Like
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();

  const handleLike = async () => {
    try {
      // Gọi trigger like. Logic Optimistic Update sẽ tự chạy ngầm.
      await likePost(id).unwrap();
    } catch (err) {
      // Nếu lỗi, logic undo() trong api sẽ tự rollback UI
      alert("Không thể thực hiện tương tác này!");
    }
  };

  if (isLoading)
    return <div className="p-10 text-center">Đang tải bài viết...</div>;
  if (isError || !post)
    return (
      <div className="p-10 text-center text-red-500">
        Bài viết không tồn tại.
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Quay lại
      </button>

      <article className="border-t pt-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-300">
            {post.user?.avatar && <img src={post.user.avatar} alt="avatar" />}
          </div>
          <div>
            <h4 className="font-bold">{post.user?.name}</h4>
            <span className="text-sm text-gray-500">
              @{post.user?.username}
            </span>
          </div>
        </div>

        <p className="mb-6 text-xl whitespace-pre-wrap">{post.content}</p>

        <div className="flex items-center gap-8 border-t border-b py-3">
          {/* Nút Like */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 transition ${
              post.is_liked ? "font-bold text-red-500" : "text-gray-600"
            }`}
          >
            <span className="text-2xl">{post.is_liked ? "❤️" : "🤍"}</span>
            <span>{post.likes_count}</span>
          </button>

          {/* Nút Reply */}
          <button className="flex items-center gap-2 text-gray-600">
            <span className="text-2xl">💬</span>
            <span>{post.replies_count}</span>
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
```

#### 3.2.6. Chi tiết file userActionsApi.js

- Tương tự 3.2.5.
