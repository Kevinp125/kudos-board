import React from "react";
import "./postlist.css";

import PostCard from "./PostCard/PostCard";

export default function PostList({ posts, board, handleDelete, togglePinRefetch, handleModalOpen}) {
  return (
    <section className="postlist-container">
      {posts.map((post) => (
        <PostCard key={post.cardId} post={post} board = {board} handleDelete = {handleDelete} togglePinRefetch = {togglePinRefetch} handleModalOpen = {handleModalOpen}/>
      ))}
    </section>
  );
}
