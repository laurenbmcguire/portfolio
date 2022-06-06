import React, { useState, useEffect } from "react";

import {
  query,
  where,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase-init";

import NavigationContainer from "../../ProtectedArea/Navigation/NavigationContainer";
import useStore from "../../StateManagement";
import MessageContainerHeader from "./MessageContainerHeader";
import EmptyContainer from "./EmptyContainer";
import ChatRow from "./ChatRow";
import MainLayout from "../../ProtectedArea/MainLayout";
import PageHeader from "../../ProtectedArea/PageHeader";

function MessageContainer({ chats }) {
  return (
    <div className="overflow-hidden rounded-b-xl bg-white shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {chats.docs.map((chat) => (
          <ChatRow chat={chat} key={chat.id} />
        ))}
      </ul>
    </div>
  );
}

function ChatPage() {
  const user = useStore((state) => state.user);

  const [queryLimit, setQueryLimit] = useState(20);
  const [chats, setChats] = useState(undefined);
  const [messageOrder, setMessageOrder] = useState("Unprocessed");

  useEffect(() => {
    try {

      if (!firestore) return;
      const chatQuery = user
        ? messageOrder === "Unprocessed"
          ? query(
              collection(firestore, "chatUsers"),
              where("processed", "==", false),
              orderBy("newestMessageCreatedAt", "desc"),
              limit(queryLimit)
            )
          : query(
              collection(firestore, "chatUsers"),
              orderBy("newestMessageCreatedAt", "desc"),
              limit(queryLimit)
            )
        : null;
      if (chatQuery === null) return;

      const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
        setChats(querySnapshot);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user, queryLimit, messageOrder]);

  return (
    <NavigationContainer>
      <MainLayout>
        <div>
          <PageHeader>Chat messages</PageHeader>
          <MessageContainerHeader
            messageOrder={messageOrder}
            setMessageOrder={setMessageOrder}
          />
          {chats && !chats.empty ? (
            <MessageContainer chats={chats} />
          ) : (
            <EmptyContainer />
          )}
          {chats && chats.size === queryLimit && (
            <div className=" flex w-full justify-center">
              <button
                onClick={() => {
                  setQueryLimit(queryLimit + 20);
                }}
                className="rounded-b-xl border bg-gray-100 px-4 py-2 text-center text-gray-700 hover:bg-gray-200 focus:outline-none"
              >
                Load more chats
              </button>
            </div>
          )}
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default ChatPage;
