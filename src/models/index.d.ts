import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type ChatGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserChatGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerChatGroup = {
  readonly id: string;
  readonly Messages?: (Message | null)[] | null;
  readonly users?: (UserChatGroup | null)[] | null;
  readonly LastMessage?: Message | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatGroupLastMessageId?: string | null;
}

type LazyChatGroup = {
  readonly id: string;
  readonly Messages: AsyncCollection<Message>;
  readonly users: AsyncCollection<UserChatGroup>;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatGroupLastMessageId?: string | null;
}

export declare type ChatGroup = LazyLoading extends LazyLoadingDisabled ? EagerChatGroup : LazyChatGroup

export declare const ChatGroup: (new (init: ModelInit<ChatGroup, ChatGroupMetaData>) => ChatGroup) & {
  copyOf(source: ChatGroup, mutator: (draft: MutableModel<ChatGroup, ChatGroupMetaData>) => MutableModel<ChatGroup, ChatGroupMetaData> | void): ChatGroup;
}

type EagerMessage = {
  readonly id: string;
  readonly message: string;
  readonly untitledfield?: string | null;
  readonly chatgroupID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly message: string;
  readonly untitledfield?: string | null;
  readonly chatgroupID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message, MessageMetaData>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

type EagerUser = {
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatGroups?: (UserChatGroup | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatGroups: AsyncCollection<UserChatGroup>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerUserChatGroup = {
  readonly id: string;
  readonly chatGroup: ChatGroup;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserChatGroup = {
  readonly id: string;
  readonly chatGroup: AsyncItem<ChatGroup>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserChatGroup = LazyLoading extends LazyLoadingDisabled ? EagerUserChatGroup : LazyUserChatGroup

export declare const UserChatGroup: (new (init: ModelInit<UserChatGroup, UserChatGroupMetaData>) => UserChatGroup) & {
  copyOf(source: UserChatGroup, mutator: (draft: MutableModel<UserChatGroup, UserChatGroupMetaData>) => MutableModel<UserChatGroup, UserChatGroupMetaData> | void): UserChatGroup;
}