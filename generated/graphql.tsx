import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createToDo?: Maybe<ToDo>;
  updateDone: ToDo;
};


export type MutationCreateToDoArgs = {
  task: Scalars['String'];
};


export type MutationUpdateDoneArgs = {
  done: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  ToDos: Array<ToDo>;
};

export type ToDo = {
  __typename?: 'ToDo';
  id: Scalars['Int'];
  task: Scalars['String'];
  done: Scalars['Boolean'];
};

export type CreateToDoMutationVariables = Exact<{
  task: Scalars['String'];
}>;


export type CreateToDoMutation = { __typename?: 'Mutation', createToDo?: Maybe<{ __typename?: 'ToDo', id: number, task: string, done: boolean }> };

export type UpdateDoneMutationVariables = Exact<{
  id: Scalars['Int'];
  done: Scalars['Boolean'];
}>;


export type UpdateDoneMutation = { __typename?: 'Mutation', updateDone: { __typename?: 'ToDo', id: number, task: string, done: boolean } };

export type ToDosQueryVariables = Exact<{ [key: string]: never; }>;


export type ToDosQuery = { __typename?: 'Query', ToDos: Array<{ __typename?: 'ToDo', id: number, task: string, done: boolean }> };


export const CreateToDoDocument = gql`
    mutation CreateToDo($task: String!) {
  createToDo(task: $task) {
    id
    task
    done
  }
}
    `;

export function useCreateToDoMutation() {
  return Urql.useMutation<CreateToDoMutation, CreateToDoMutationVariables>(CreateToDoDocument);
};
export const UpdateDoneDocument = gql`
    mutation updateDone($id: Int!, $done: Boolean!) {
  updateDone(id: $id, done: $done) {
    id
    task
    done
  }
}
    `;

export function useUpdateDoneMutation() {
  return Urql.useMutation<UpdateDoneMutation, UpdateDoneMutationVariables>(UpdateDoneDocument);
};
export const ToDosDocument = gql`
    query ToDos {
  ToDos {
    id
    task
    done
  }
}
    `;

export function useToDosQuery(options: Omit<Urql.UseQueryArgs<ToDosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ToDosQuery>({ query: ToDosDocument, ...options });
};