import Header from "@/components/Header";
import WhatIsNew from "./WhatIsNew";
import PostCard from "@/components/post/PostCard";
import NavFirstHome from "./NavFirstHome";
import { useGetPostsFeedQuery } from "@/services/postService.js";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetUserInfoQuery } from "@/services/Auth/authApi";

const Home = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const { data: newPost, isFetching } = useGetPostsFeedQuery({
    type: "for_you",
    page: page,
  });
  useEffect(() => {
    if (newPost) {
      if (newPost.length == 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setPosts(newPost);
        } else {
          setPosts((prevPost) => [...prevPost, ...newPost]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  const fetchMoreData = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  //  info user
  const currentUser = useGetUserInfoQuery();
  console.log(currentUser);
  return (
    <div className="w-full mx-auto ">
      <Header title={"Home"} />
      <div className="md:border">
        {currentUser.isSuccess && (
          <>
            <WhatIsNew />
            <NavFirstHome />
          </>
        )}

        <div className=" p-4 rounded-2xl min-h-screen" id="scrollableDiv">
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="text-center py-4">Đang tải ...</div>}
            endMessage={
              <p className="text-center py-4 text-gray-500">
                <b>Bạn đã xem hết bài viết!</b>
              </p>
            }
            className="-mx-4 "
            scrollableTarget="scrollableDiv"
          >
            {posts.map((post) => (
              <div className="border-b mb-2 pb-2" key={post.id}>
                <PostCard
                  showCommentLine={true}
                  content={post.content}
                  username={post.user.username}
                  date={post.created_at}
                  id={post.id}
                  likesCount={post.likes_count}
                  isLiked={post.is_liked_by_auth}
                  isRepost={post.is_reposted_by_auth}
                  repostCount={post.reposts_and_quotes_count}
                  post={post}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
export default Home;
