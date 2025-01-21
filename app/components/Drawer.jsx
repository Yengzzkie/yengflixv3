import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { Avatar } from "@material-tailwind/react";
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Replies from "@/app/components/Replies";
import ReplyForm from "@/app/components/ReplyForm";
import DOMPurify from "dompurify";

export const DragCloseDrawerExample = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(post?.content);

  return (
    <div className="bg-neutral-950 w-fit self-end ml-auto">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full"
      >
        <ArrowUpTrayIcon className="w-4 bg-none" />
      </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="p-4 max-w-5xl mx-auto border border-zinc-500 rounded-lg my-4">
          <div className="flex items-center">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${post?.posted_by?.name}&background=random`}
              alt={`avatar ${post?.posted_by?.name}`}
              size="xs"
              className="mr-2 rounded-full"
            />
            <p className="text-sm italic text-zinc-400">
              Posted by: {post?.posted_by?.name}
            </p>
          </div>
          <h1 className="text-2xl font-bold my-4">{post?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

          {/* BUTTONS */}
          <div className="flex items-center mt-3">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-zinc-200 text-sm  border border-zinc-500 hover:bg-[var(--primary-dark)] px-3 py-1 rounded-full mr-2"
            >
              {showReplyForm ? "Close" : "Reply"}
            </button>

            <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full mr-2">
              <HandThumbUpIcon className="w-4 mr-2" />
              <span>{post?.comments?.length}</span>
            </div>

            <div className="flex items-center bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-sm px-3 py-1 rounded-full">
              <ChatBubbleBottomCenterIcon className="w-4 mr-2" />
              <span>{post?.comments?.length}</span>
            </div>
          </div>

          {/* REPLY FORM */}

          <ReplyForm
            placeholder={"reply..."}
            onSubmit={(content) => {
              addReply(post.id, content);
              setShowReplyForm(false);
            }}
          />

          <div className="ml-6 border-l-[.5px] border-zinc-500 pl-4">
            {post?.comments?.map((post) => (
              <Replies key={post.id} post={post} />
            ))}
          </div>
        </div>
      </DragCloseDrawer>
    </div>
  );
};

export const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-[999] bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[90vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
