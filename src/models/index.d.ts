import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO"
}

export enum AttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO"
}

type MediaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AttachmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}

type UserChatGroupMetaData = {
  readOnlyFields: 'createdAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserContactMetaData = {
  readOnlyFields: 'createdAt';
}

type EagerMedia = {
  readonly id: string;
  readonly storageKey?: string | null;
  readonly type?: MediaType | keyof typeof MediaType | null;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly duration?: string | null;
  readonly width?: string | null;
  readonly height?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMedia = {
  readonly id: string;
  readonly storageKey?: string | null;
  readonly type?: MediaType | keyof typeof MediaType | null;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly duration?: string | null;
  readonly width?: string | null;
  readonly height?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Media = LazyLoading extends LazyLoadingDisabled ? EagerMedia : LazyMedia

export declare const Media: (new (init: ModelInit<Media, MediaMetaData>) => Media) & {
  copyOf(source: Media, mutator: (draft: MutableModel<Media, MediaMetaData>) => MutableModel<Media, MediaMetaData> | void): Media;
}

type EagerAttachment = {
  readonly id: string;
  readonly storageKey: string;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAttachment = {
  readonly id: string;
  readonly storageKey: string;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Attachment = LazyLoading extends LazyLoadingDisabled ? EagerAttachment : LazyAttachment

export declare const Attachment: (new (init: ModelInit<Attachment, AttachmentMetaData>) => Attachment) & {
  copyOf(source: Attachment, mutator: (draft: MutableModel<Attachment, AttachmentMetaData>) => MutableModel<Attachment, AttachmentMetaData> | void): Attachment;
}

type EagerChatGroup = {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly LastMessage?: Message | null;
  readonly Messages?: (Message | null)[] | null;
  readonly users?: (UserChatGroup | null)[] | null;
  readonly leaderID?: string | null;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly Media?: (Media | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatGroupLastMessageId?: string | null;
}

type LazyChatGroup = {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly Messages: AsyncCollection<Message>;
  readonly users: AsyncCollection<UserChatGroup>;
  readonly leaderID?: string | null;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly Media: AsyncCollection<Media>;
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
  readonly createdAt?: string | null;
  readonly message?: string | null;
  readonly userID: string;
  readonly chatgroupID: string;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly Media?: (Media | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly message?: string | null;
  readonly userID: string;
  readonly chatgroupID: string;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly Media: AsyncCollection<Media>;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message, MessageMetaData>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

type EagerUserChatGroup = {
  readonly id: string;
  readonly updatedAt: string;
  readonly Chatgroup?: ChatGroup | null;
  readonly user?: User | null;
  readonly createdAt?: string | null;
}

type LazyUserChatGroup = {
  readonly id: string;
  readonly updatedAt: string;
  readonly Chatgroup: AsyncItem<ChatGroup | undefined>;
  readonly user: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
}

export declare type UserChatGroup = LazyLoading extends LazyLoadingDisabled ? EagerUserChatGroup : LazyUserChatGroup

export declare const UserChatGroup: (new (init: ModelInit<UserChatGroup, UserChatGroupMetaData>) => UserChatGroup) & {
  copyOf(source: UserChatGroup, mutator: (draft: MutableModel<UserChatGroup, UserChatGroupMetaData>) => MutableModel<UserChatGroup, UserChatGroupMetaData> | void): UserChatGroup;
}

type EagerUser = {
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly inviteId: string;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatGroups?: (UserChatGroup | null)[] | null;
  readonly Users?: (UserContact | null)[] | null;
  readonly Leader?: (ChatGroup | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly inviteId: string;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatGroups: AsyncCollection<UserChatGroup>;
  readonly Users: AsyncCollection<UserContact>;
  readonly Leader: AsyncCollection<ChatGroup>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerUserContact = {
  readonly id: string;
  readonly updatedAt: string;
  readonly status?: string | null;
  readonly user?: User | null;
  readonly friend?: User | null;
  readonly createdAt?: string | null;
}

type LazyUserContact = {
  readonly id: string;
  readonly updatedAt: string;
  readonly status?: string | null;
  readonly user: AsyncItem<User | undefined>;
  readonly friend: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
}

export declare type UserContact = LazyLoading extends LazyLoadingDisabled ? EagerUserContact : LazyUserContact

export declare const UserContact: (new (init: ModelInit<UserContact, UserContactMetaData>) => UserContact) & {
  copyOf(source: UserContact, mutator: (draft: MutableModel<UserContact, UserContactMetaData>) => MutableModel<UserContact, UserContactMetaData> | void): UserContact;
}