/* eslint-disable react-hooks/set-state-in-effect */
import Header from "@/components/Header";
import PostCard from "@/components/post/PostCard";
import {
  useGetPostIdQuery,
  useGetPostRepliesQuery,
} from "@/services/postService";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";

export const PostDetail = () => {
  const { postId } = useParams();
  const { data: post } = useGetPostIdQuery({ id: postId });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [replies, setReplies] = useState([]);
  const { data: newReplies, isFetching } = useGetPostRepliesQuery({
    id: postId,
    page,
  });
  console.log(newReplies);
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setReplies([]);
  }, [postId]);
  console.log(newReplies);

  console.log(replies);
  useEffect(() => {
    if (newReplies) {
      if (newReplies.length == 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setReplies(newReplies);
        } else {
          setReplies((prev) => [...prev, ...newReplies]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReplies]);

  const fetchMoreData = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
      <div className="w-full mx-auto flex flex-col h-screen">
        <Header title={"Thread"} back="true" />
        <div className="md:border flex-1 overflow-hidden">
          <div
            className=" p-4 rounded-2xl  overflow-y-auto h-full"
            id="scrollableReplies"
          >
            <div className="min-h-10">
              {" "}
              {post && (
                <div className="-mx-4">
                  <PostCard
                    showCommentLine={false}
                    content={post?.content}
                    username={post?.user.username}
                    date={post?.created_at}
                    id={post?.id}
                    likesCount={post?.likes_count}
                    isLiked={post?.is_liked_by_auth}
                    isRepost={post?.is_reposted_by_auth}
                    repostCount={post?.reposts_and_quotes_count}
                    post={post}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-1 border-t py-3">
              <span className="flex gap-1 font-bold cursor-pointer">
                Mới đây <ChevronDown />{" "}
              </span>
              <span className="flex gap-1 text-gray-400 cursor-pointer">
                Xem hoạt động <ChevronRight />
              </span>
            </div>
            <hr className="-mx-4" />

            <div>
              <InfiniteScroll
                dataLength={replies.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="text-center py-4">Đang tải ...</div>}
                endMessage={
                  <p className="text-center py-4 text-gray-500">
                    <b>Hết Comment!</b>
                  </p>
                }
                className="-mx-4"
                scrollableTarget="scrollableReplies"
              >
                {replies?.map((post) => (
                  <div className="py-4 border-b" key={post.id}>
                    <PostCard
                      showCommentLine={true}
                      content={post?.content}
                      username={post?.user.username}
                      date={post?.created_at}
                      id={post?.id}
                      likesCount={post?.likes_count}
                      isLiked={post?.is_liked_by_auth}
                      isRepost={post?.is_reposted_by_auth}
                      repostCount={post?.reposts_and_quotes_count}
                      post={post}
                    />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
