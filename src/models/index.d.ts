import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
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

export enum RequestStatusType {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  BLOCKED = "BLOCKED"
}



type EagerMedia = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Media, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey?: string | null;
  readonly type?: MediaType | keyof typeof MediaType | null;
  readonly messageID?: string | null;
  readonly chatgroupID?: string | null;
  readonly blogID?: string | null;
  readonly userID?: string | null;
  readonly duration?: string | null;
  readonly width?: string | null;
  readonly height?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMedia = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Media, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey?: string | null;
  readonly type?: MediaType | keyof typeof MediaType | null;
  readonly messageID?: string | null;
  readonly chatgroupID?: string | null;
  readonly blogID?: string | null;
  readonly userID?: string | null;
  readonly duration?: string | null;
  readonly width?: string | null;
  readonly height?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Media = LazyLoading extends LazyLoadingDisabled ? EagerMedia : LazyMedia

export declare const Media: (new (init: ModelInit<Media>) => Media) & {
  copyOf(source: Media, mutator: (draft: MutableModel<Media>) => MutableModel<Media> | void): Media;
}

type EagerAttachment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey: string;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly name: string;
  readonly size: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAttachment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey: string;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly messageID: string;
  readonly chatgroupID: string;
  readonly name: string;
  readonly size: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Attachment = LazyLoading extends LazyLoadingDisabled ? EagerAttachment : LazyAttachment

export declare const Attachment: (new (init: ModelInit<Attachment>) => Attachment) & {
  copyOf(source: Attachment, mutator: (draft: MutableModel<Attachment>) => MutableModel<Attachment> | void): Attachment;
}

type EagerChatGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatGroup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatGroup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const ChatGroup: (new (init: ModelInit<ChatGroup>) => ChatGroup) & {
  copyOf(source: ChatGroup, mutator: (draft: MutableModel<ChatGroup>) => MutableModel<ChatGroup> | void): ChatGroup;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
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

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerUserChatGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatGroup, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly chatgroupID: string;
  readonly updatedAt: string;
  readonly Chatgroup?: ChatGroup | null;
  readonly user?: User | null;
  readonly createdAt?: string | null;
}

type LazyUserChatGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatGroup, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly chatgroupID: string;
  readonly updatedAt: string;
  readonly Chatgroup: AsyncItem<ChatGroup | undefined>;
  readonly user: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
}

export declare type UserChatGroup = LazyLoading extends LazyLoadingDisabled ? EagerUserChatGroup : LazyUserChatGroup

export declare const UserChatGroup: (new (init: ModelInit<UserChatGroup>) => UserChatGroup) & {
  copyOf(source: UserChatGroup, mutator: (draft: MutableModel<UserChatGroup>) => MutableModel<UserChatGroup> | void): UserChatGroup;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly inviteId: string;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatGroups?: (UserChatGroup | null)[] | null;
  readonly Friends?: (UserContact | null)[] | null;
  readonly Leader?: (ChatGroup | null)[] | null;
  readonly Blog?: (Blog | null)[] | null;
  readonly Media?: (Media | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly inviteId: string;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatGroups: AsyncCollection<UserChatGroup>;
  readonly Friends: AsyncCollection<UserContact>;
  readonly Leader: AsyncCollection<ChatGroup>;
  readonly Blog: AsyncCollection<Blog>;
  readonly Media: AsyncCollection<Media>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserContact, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly friendID: string;
  readonly updatedAt: string;
  readonly sender: boolean;
  readonly requestStatus: RequestStatusType | keyof typeof RequestStatusType;
  readonly user?: User | null;
  readonly friend?: User | null;
  readonly userContact?: UserContact | null;
  readonly createdAt?: string | null;
  readonly userContactUserContactId?: string | null;
}

type LazyUserContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserContact, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly friendID: string;
  readonly updatedAt: string;
  readonly sender: boolean;
  readonly requestStatus: RequestStatusType | keyof typeof RequestStatusType;
  readonly user: AsyncItem<User | undefined>;
  readonly friend: AsyncItem<User | undefined>;
  readonly userContact: AsyncItem<UserContact | undefined>;
  readonly createdAt?: string | null;
  readonly userContactUserContactId?: string | null;
}

export declare type UserContact = LazyLoading extends LazyLoadingDisabled ? EagerUserContact : LazyUserContact

export declare const UserContact: (new (init: ModelInit<UserContact>) => UserContact) & {
  copyOf(source: UserContact, mutator: (draft: MutableModel<UserContact>) => MutableModel<UserContact> | void): UserContact;
}

type EagerBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
  };
  readonly id: string;
  readonly userID: string;
  readonly createdAt: string;
  readonly message?: string | null;
  readonly comments?: (Comment | null)[] | null;
  readonly Media?: (Media | null)[] | null;
  readonly updatedAt: string;
}

type LazyBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
  };
  readonly id: string;
  readonly userID: string;
  readonly createdAt: string;
  readonly message?: string | null;
  readonly comments: AsyncCollection<Comment>;
  readonly Media: AsyncCollection<Media>;
  readonly updatedAt: string;
}

export declare type Blog = LazyLoading extends LazyLoadingDisabled ? EagerBlog : LazyBlog

export declare const Blog: (new (init: ModelInit<Blog>) => Blog) & {
  copyOf(source: Blog, mutator: (draft: MutableModel<Blog>) => MutableModel<Blog> | void): Blog;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly message?: string | null;
  readonly commentID: string;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly message?: string | null;
  readonly commentID: string;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}