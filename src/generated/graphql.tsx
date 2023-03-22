import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
  /** The `AWSURL` scalar type provided by AWS AppSync, represents a valid URL string (Ex: <https://www.amazon.com/>). The URL may use any scheme and may also be a local URL (Ex: <http://localhost/>).  URLs without schemes like "**amazon.com**" or "**www.amazon.com**" are considered invalid. URLs which contain double slashes (two consecutive forward slashes) in their path are also considered invalid. */
  AWSURL: any;
  /** The `AWSDate` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 Date](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates) string. In other words, this scalar type accepts date strings of the form `YYYY-MM-DD`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-05-01**" and "**-9999-01-01**" are both valid dates.  This scalar type can also accept an optional [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators). For example, "**1970-01-01**", "**1970-01-01Z**", "**1970-01-01-07:00**" and "**1970-01-01+05:30**" are all valid dates. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDate: any;
};










export type Allocation = {
  __typename?: 'Allocation';
  place: Place;
  date: Scalars['AWSDate'];
  people: Array<Person>;
};

export type AllocationInput = {
  place: Scalars['ID'];
  date: Scalars['AWSDate'];
  people: Array<Scalars['ID']>;
};



export type CreatePersonInput = {
  photo?: Maybe<Scalars['AWSURL']>;
  name: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  battalion?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  graduation?: Maybe<Scalars['String']>;
  courses?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  rg?: Maybe<Scalars['String']>;
  cpf?: Maybe<Scalars['String']>;
  bankDetails?: Maybe<Scalars['String']>;
};

export type CreatePlaceInput = {
  name: Scalars['String'];
  headcount: Scalars['Int'];
  personPrice: Scalars['Int'];
  leaderPrice: Scalars['Int'];
  retailPrice: Scalars['Int'];
};

export type DeletePersonInput = {
  id: Scalars['ID'];
};

export type DeletePlaceInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerson?: Maybe<Person>;
  updatePerson?: Maybe<Person>;
  deletePerson?: Maybe<Person>;
  createPlace?: Maybe<Place>;
  updatePlace?: Maybe<Place>;
  deletePlace?: Maybe<Place>;
  setAllocation?: Maybe<Allocation>;
  createUser?: Maybe<UserOutput>;
  deleteUser?: Maybe<Scalars['Boolean']>;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


export type MutationDeletePersonArgs = {
  input: DeletePersonInput;
};


export type MutationCreatePlaceArgs = {
  input: CreatePlaceInput;
};


export type MutationUpdatePlaceArgs = {
  input: UpdatePlaceInput;
};


export type MutationDeletePlaceArgs = {
  input: DeletePlaceInput;
};


export type MutationSetAllocationArgs = {
  input: AllocationInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteUserArgs = {
  username: Scalars['String'];
};

export type MyAllocation = {
  __typename?: 'MyAllocation';
  date: Scalars['AWSDate'];
  people: Array<Person>;
};

export type MyPlace = {
  __typename?: 'MyPlace';
  id: Scalars['ID'];
  name: Scalars['String'];
  headcount: Scalars['Int'];
  retailPrice: Scalars['Int'];
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  photo?: Maybe<Scalars['AWSURL']>;
  name: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  battalion?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  graduation?: Maybe<Scalars['String']>;
  courses?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  rg?: Maybe<Scalars['String']>;
  cpf?: Maybe<Scalars['String']>;
  bankDetails?: Maybe<Scalars['String']>;
};

export type PersonConnection = {
  __typename?: 'PersonConnection';
  items?: Maybe<Array<Maybe<Person>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  name: Scalars['String'];
  headcount: Scalars['Int'];
  personPrice: Scalars['Int'];
  leaderPrice: Scalars['Int'];
  retailPrice: Scalars['Int'];
};

export type PlaceConnection = {
  __typename?: 'PlaceConnection';
  items?: Maybe<Array<Maybe<Place>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getPerson?: Maybe<Person>;
  listPeople?: Maybe<PersonConnection>;
  getPlace?: Maybe<Place>;
  listPlaces?: Maybe<PlaceConnection>;
  listAllocations?: Maybe<Array<Maybe<Allocation>>>;
  listPersonAllocations?: Maybe<Array<Maybe<Allocation>>>;
  listMyAllocations?: Maybe<Array<Maybe<MyAllocation>>>;
  listUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetPersonArgs = {
  id: Scalars['ID'];
};


export type QueryListPeopleArgs = {
  filter?: Maybe<TablePersonFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryGetPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryListPlacesArgs = {
  filter?: Maybe<TablePlaceFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};


export type QueryListAllocationsArgs = {
  place: Scalars['ID'];
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
};


export type QueryListPersonAllocationsArgs = {
  person: Scalars['ID'];
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
};


export type QueryListMyAllocationsArgs = {
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
};


export type QueryListUsersArgs = {
  place: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreatePerson?: Maybe<Person>;
  onUpdatePerson?: Maybe<Person>;
  onDeletePerson?: Maybe<Person>;
  onCreatePlace?: Maybe<Place>;
  onUpdatePlace?: Maybe<Place>;
  onDeletePlace?: Maybe<Place>;
};


export type SubscriptionOnCreatePersonArgs = {
  id?: Maybe<Scalars['ID']>;
  photo?: Maybe<Scalars['AWSURL']>;
  name: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
};


export type SubscriptionOnUpdatePersonArgs = {
  id?: Maybe<Scalars['ID']>;
  photo?: Maybe<Scalars['AWSURL']>;
  name: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
};


export type SubscriptionOnDeletePersonArgs = {
  id?: Maybe<Scalars['ID']>;
  photo?: Maybe<Scalars['AWSURL']>;
  name: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
};


export type SubscriptionOnCreatePlaceArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  headcount?: Maybe<Scalars['Int']>;
  personPrice?: Maybe<Scalars['Int']>;
  leaderPrice?: Maybe<Scalars['Int']>;
};


export type SubscriptionOnUpdatePlaceArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  headcount?: Maybe<Scalars['Int']>;
  personPrice?: Maybe<Scalars['Int']>;
  leaderPrice?: Maybe<Scalars['Int']>;
};


export type SubscriptionOnDeletePlaceArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  headcount?: Maybe<Scalars['Int']>;
  personPrice?: Maybe<Scalars['Int']>;
  leaderPrice?: Maybe<Scalars['Int']>;
};

export type TableBooleanFilterInput = {
  ne?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
};

export type TableFloatFilterInput = {
  ne?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  contains?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['Float']>;
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type TableIdFilterInput = {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  contains?: Maybe<Scalars['ID']>;
  notContains?: Maybe<Scalars['ID']>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
  beginsWith?: Maybe<Scalars['ID']>;
};

export type TableIntFilterInput = {
  ne?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['Int']>;
  notContains?: Maybe<Scalars['Int']>;
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type TablePersonFilterInput = {
  id?: Maybe<TableIdFilterInput>;
  photo?: Maybe<TableStringFilterInput>;
  name?: Maybe<TableStringFilterInput>;
  fullName?: Maybe<TableStringFilterInput>;
  battalion?: Maybe<TableStringFilterInput>;
  department?: Maybe<TableStringFilterInput>;
  graduation?: Maybe<TableStringFilterInput>;
  courses?: Maybe<TableStringFilterInput>;
  phone?: Maybe<TableStringFilterInput>;
  rg?: Maybe<TableStringFilterInput>;
  cpf?: Maybe<TableStringFilterInput>;
  bankDetails?: Maybe<TableStringFilterInput>;
};

export type TablePlaceFilterInput = {
  id?: Maybe<TableIdFilterInput>;
  name?: Maybe<TableStringFilterInput>;
  headcount?: Maybe<TableIntFilterInput>;
  personPrice?: Maybe<TableIntFilterInput>;
  leaderPrice?: Maybe<TableIntFilterInput>;
  retailPrice?: Maybe<TableIntFilterInput>;
};

export type TableStringFilterInput = {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
  beginsWith?: Maybe<Scalars['String']>;
};

export type UpdatePersonInput = {
  id: Scalars['ID'];
  photo?: Maybe<Scalars['AWSURL']>;
  name?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  battalion?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  graduation?: Maybe<Scalars['String']>;
  courses?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  rg?: Maybe<Scalars['String']>;
  cpf?: Maybe<Scalars['String']>;
  bankDetails?: Maybe<Scalars['String']>;
};

export type UpdatePlaceInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  headcount?: Maybe<Scalars['Int']>;
  personPrice?: Maybe<Scalars['Int']>;
  leaderPrice?: Maybe<Scalars['Int']>;
  retailPrice?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  email: Scalars['String'];
  group: UserGroup;
  place?: Maybe<MyPlace>;
};

export enum UserGroup {
  Admins = 'Admins',
  Managers = 'Managers',
  Supervisors = 'Supervisors',
  Assistants = 'Assistants'
}

export type UserInput = {
  username: Scalars['ID'];
  email: Scalars['String'];
  place: Scalars['ID'];
  group: UserGroup;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  user: User;
  password: Scalars['String'];
};

export type ListAllocationsQueryVariables = Exact<{
  place: Scalars['ID'];
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
}>;


export type ListAllocationsQuery = (
  { __typename?: 'Query' }
  & { listAllocations?: Maybe<Array<Maybe<(
    { __typename?: 'Allocation' }
    & Pick<Allocation, 'date'>
    & { people: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'photo' | 'name' | 'department'>
    )> }
  )>>> }
);

export type ListPersonAllocationsQueryVariables = Exact<{
  person: Scalars['ID'];
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
}>;


export type ListPersonAllocationsQuery = (
  { __typename?: 'Query' }
  & { listPersonAllocations?: Maybe<Array<Maybe<(
    { __typename?: 'Allocation' }
    & Pick<Allocation, 'date'>
    & { place: (
      { __typename?: 'Place' }
      & Pick<Place, 'name' | 'personPrice' | 'leaderPrice'>
    ), people: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id'>
    )> }
  )>>> }
);

export type SetAllocationMutationVariables = Exact<{
  input: AllocationInput;
}>;


export type SetAllocationMutation = (
  { __typename?: 'Mutation' }
  & { setAllocation?: Maybe<(
    { __typename?: 'Allocation' }
    & Pick<Allocation, 'date'>
    & { place: (
      { __typename?: 'Place' }
      & Pick<Place, 'id'>
    ) }
  )> }
);

export type ListMyAllocationsQueryVariables = Exact<{
  from: Scalars['AWSDate'];
  to: Scalars['AWSDate'];
}>;


export type ListMyAllocationsQuery = (
  { __typename?: 'Query' }
  & { listMyAllocations?: Maybe<Array<Maybe<(
    { __typename?: 'MyAllocation' }
    & Pick<MyAllocation, 'date'>
    & { people: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name' | 'photo' | 'department'>
    )> }
  )>>> }
);

export type ListPeopleQueryVariables = Exact<{
  filter?: Maybe<TablePersonFilterInput>;
}>;


export type ListPeopleQuery = (
  { __typename?: 'Query' }
  & { listPeople?: Maybe<(
    { __typename?: 'PersonConnection' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'photo' | 'name' | 'fullName' | 'department' | 'graduation' | 'courses' | 'phone' | 'rg' | 'cpf' | 'bankDetails'>
    )>>> }
  )> }
);

export type GetPersonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPersonQuery = (
  { __typename?: 'Query' }
  & { getPerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'photo' | 'name' | 'fullName' | 'department' | 'graduation' | 'courses' | 'phone' | 'rg' | 'cpf' | 'bankDetails'>
  )> }
);

export type CreatePersonMutationVariables = Exact<{
  input: CreatePersonInput;
}>;


export type CreatePersonMutation = (
  { __typename?: 'Mutation' }
  & { createPerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
  )> }
);

export type UpdatePersonMutationVariables = Exact<{
  input: UpdatePersonInput;
}>;


export type UpdatePersonMutation = (
  { __typename?: 'Mutation' }
  & { updatePerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
  )> }
);

export type DeletePersonMutationVariables = Exact<{
  input: DeletePersonInput;
}>;


export type DeletePersonMutation = (
  { __typename?: 'Mutation' }
  & { deletePerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
  )> }
);

export type ListPlacesQueryVariables = Exact<{
  filter?: Maybe<TablePlaceFilterInput>;
}>;


export type ListPlacesQuery = (
  { __typename?: 'Query' }
  & { listPlaces?: Maybe<(
    { __typename?: 'PlaceConnection' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'name' | 'headcount' | 'personPrice' | 'leaderPrice' | 'retailPrice'>
    )>>> }
  )> }
);

export type GetPlaceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlaceQuery = (
  { __typename?: 'Query' }
  & { getPlace?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'name' | 'headcount' | 'personPrice' | 'leaderPrice' | 'retailPrice'>
  )> }
);

export type CreatePlaceMutationVariables = Exact<{
  input: CreatePlaceInput;
}>;


export type CreatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { createPlace?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
  )> }
);

export type UpdatePlaceMutationVariables = Exact<{
  input: UpdatePlaceInput;
}>;


export type UpdatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { updatePlace?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
  )> }
);

export type DeletePlaceMutationVariables = Exact<{
  input: DeletePlaceInput;
}>;


export type DeletePlaceMutation = (
  { __typename?: 'Mutation' }
  & { deletePlace?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'group'>
    & { place?: Maybe<(
      { __typename?: 'MyPlace' }
      & Pick<MyPlace, 'name' | 'headcount' | 'retailPrice'>
    )> }
  )> }
);

export type ListUsersQueryVariables = Exact<{
  place: Scalars['ID'];
}>;


export type ListUsersQuery = (
  { __typename?: 'Query' }
  & { listUsers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'group'>
  )>>> }
);

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'UserOutput' }
    & Pick<UserOutput, 'password'>
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);


export const ListAllocationsDocument = gql`
    query listAllocations($place: ID!, $from: AWSDate!, $to: AWSDate!) {
  listAllocations(place: $place, from: $from, to: $to) {
    date
    people {
      id
      photo
      name
      department
    }
  }
}
    `;
export type ListAllocationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListAllocationsQuery, ListAllocationsQueryVariables>, 'query'> & ({ variables: ListAllocationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListAllocationsComponent = (props: ListAllocationsComponentProps) => (
      <ApolloReactComponents.Query<ListAllocationsQuery, ListAllocationsQueryVariables> query={ListAllocationsDocument} {...props} />
    );
    

/**
 * __useListAllocationsQuery__
 *
 * To run a query within a React component, call `useListAllocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAllocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAllocationsQuery({
 *   variables: {
 *      place: // value for 'place'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useListAllocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListAllocationsQuery, ListAllocationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListAllocationsQuery, ListAllocationsQueryVariables>(ListAllocationsDocument, baseOptions);
      }
export function useListAllocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListAllocationsQuery, ListAllocationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListAllocationsQuery, ListAllocationsQueryVariables>(ListAllocationsDocument, baseOptions);
        }
export type ListAllocationsQueryHookResult = ReturnType<typeof useListAllocationsQuery>;
export type ListAllocationsLazyQueryHookResult = ReturnType<typeof useListAllocationsLazyQuery>;
export type ListAllocationsQueryResult = ApolloReactCommon.QueryResult<ListAllocationsQuery, ListAllocationsQueryVariables>;
export const ListPersonAllocationsDocument = gql`
    query listPersonAllocations($person: ID!, $from: AWSDate!, $to: AWSDate!) {
  listPersonAllocations(person: $person, from: $from, to: $to) {
    place {
      name
      personPrice
      leaderPrice
    }
    date
    people {
      id
    }
  }
}
    `;
export type ListPersonAllocationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>, 'query'> & ({ variables: ListPersonAllocationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListPersonAllocationsComponent = (props: ListPersonAllocationsComponentProps) => (
      <ApolloReactComponents.Query<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables> query={ListPersonAllocationsDocument} {...props} />
    );
    

/**
 * __useListPersonAllocationsQuery__
 *
 * To run a query within a React component, call `useListPersonAllocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPersonAllocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPersonAllocationsQuery({
 *   variables: {
 *      person: // value for 'person'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useListPersonAllocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>(ListPersonAllocationsDocument, baseOptions);
      }
export function useListPersonAllocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>(ListPersonAllocationsDocument, baseOptions);
        }
export type ListPersonAllocationsQueryHookResult = ReturnType<typeof useListPersonAllocationsQuery>;
export type ListPersonAllocationsLazyQueryHookResult = ReturnType<typeof useListPersonAllocationsLazyQuery>;
export type ListPersonAllocationsQueryResult = ApolloReactCommon.QueryResult<ListPersonAllocationsQuery, ListPersonAllocationsQueryVariables>;
export const SetAllocationDocument = gql`
    mutation setAllocation($input: AllocationInput!) {
  setAllocation(input: $input) {
    place {
      id
    }
    date
  }
}
    `;
export type SetAllocationMutationFn = ApolloReactCommon.MutationFunction<SetAllocationMutation, SetAllocationMutationVariables>;
export type SetAllocationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetAllocationMutation, SetAllocationMutationVariables>, 'mutation'>;

    export const SetAllocationComponent = (props: SetAllocationComponentProps) => (
      <ApolloReactComponents.Mutation<SetAllocationMutation, SetAllocationMutationVariables> mutation={SetAllocationDocument} {...props} />
    );
    

/**
 * __useSetAllocationMutation__
 *
 * To run a mutation, you first call `useSetAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAllocationMutation, { data, loading, error }] = useSetAllocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAllocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetAllocationMutation, SetAllocationMutationVariables>) {
        return ApolloReactHooks.useMutation<SetAllocationMutation, SetAllocationMutationVariables>(SetAllocationDocument, baseOptions);
      }
export type SetAllocationMutationHookResult = ReturnType<typeof useSetAllocationMutation>;
export type SetAllocationMutationResult = ApolloReactCommon.MutationResult<SetAllocationMutation>;
export type SetAllocationMutationOptions = ApolloReactCommon.BaseMutationOptions<SetAllocationMutation, SetAllocationMutationVariables>;
export const ListMyAllocationsDocument = gql`
    query listMyAllocations($from: AWSDate!, $to: AWSDate!) {
  listMyAllocations(from: $from, to: $to) {
    date
    people {
      id
      name
      photo
      department
    }
  }
}
    `;
export type ListMyAllocationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>, 'query'> & ({ variables: ListMyAllocationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListMyAllocationsComponent = (props: ListMyAllocationsComponentProps) => (
      <ApolloReactComponents.Query<ListMyAllocationsQuery, ListMyAllocationsQueryVariables> query={ListMyAllocationsDocument} {...props} />
    );
    

/**
 * __useListMyAllocationsQuery__
 *
 * To run a query within a React component, call `useListMyAllocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListMyAllocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListMyAllocationsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useListMyAllocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>(ListMyAllocationsDocument, baseOptions);
      }
export function useListMyAllocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>(ListMyAllocationsDocument, baseOptions);
        }
export type ListMyAllocationsQueryHookResult = ReturnType<typeof useListMyAllocationsQuery>;
export type ListMyAllocationsLazyQueryHookResult = ReturnType<typeof useListMyAllocationsLazyQuery>;
export type ListMyAllocationsQueryResult = ApolloReactCommon.QueryResult<ListMyAllocationsQuery, ListMyAllocationsQueryVariables>;
export const ListPeopleDocument = gql`
    query listPeople($filter: TablePersonFilterInput) {
  listPeople(filter: $filter) {
    items {
      id
      photo
      name
      fullName
      department
      graduation
      courses
      phone
      rg
      cpf
      bankDetails
    }
  }
}
    `;
export type ListPeopleComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListPeopleQuery, ListPeopleQueryVariables>, 'query'>;

    export const ListPeopleComponent = (props: ListPeopleComponentProps) => (
      <ApolloReactComponents.Query<ListPeopleQuery, ListPeopleQueryVariables> query={ListPeopleDocument} {...props} />
    );
    

/**
 * __useListPeopleQuery__
 *
 * To run a query within a React component, call `useListPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPeopleQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListPeopleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListPeopleQuery, ListPeopleQueryVariables>) {
        return ApolloReactHooks.useQuery<ListPeopleQuery, ListPeopleQueryVariables>(ListPeopleDocument, baseOptions);
      }
export function useListPeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListPeopleQuery, ListPeopleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListPeopleQuery, ListPeopleQueryVariables>(ListPeopleDocument, baseOptions);
        }
export type ListPeopleQueryHookResult = ReturnType<typeof useListPeopleQuery>;
export type ListPeopleLazyQueryHookResult = ReturnType<typeof useListPeopleLazyQuery>;
export type ListPeopleQueryResult = ApolloReactCommon.QueryResult<ListPeopleQuery, ListPeopleQueryVariables>;
export const GetPersonDocument = gql`
    query getPerson($id: ID!) {
  getPerson(id: $id) {
    id
    photo
    name
    fullName
    department
    graduation
    courses
    phone
    rg
    cpf
    bankDetails
  }
}
    `;
export type GetPersonComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPersonQuery, GetPersonQueryVariables>, 'query'> & ({ variables: GetPersonQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPersonComponent = (props: GetPersonComponentProps) => (
      <ApolloReactComponents.Query<GetPersonQuery, GetPersonQueryVariables> query={GetPersonDocument} {...props} />
    );
    

/**
 * __useGetPersonQuery__
 *
 * To run a query within a React component, call `useGetPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, baseOptions);
      }
export function useGetPersonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, baseOptions);
        }
export type GetPersonQueryHookResult = ReturnType<typeof useGetPersonQuery>;
export type GetPersonLazyQueryHookResult = ReturnType<typeof useGetPersonLazyQuery>;
export type GetPersonQueryResult = ApolloReactCommon.QueryResult<GetPersonQuery, GetPersonQueryVariables>;
export const CreatePersonDocument = gql`
    mutation createPerson($input: CreatePersonInput!) {
  createPerson(input: $input) {
    id
  }
}
    `;
export type CreatePersonMutationFn = ApolloReactCommon.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;
export type CreatePersonComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePersonMutation, CreatePersonMutationVariables>, 'mutation'>;

    export const CreatePersonComponent = (props: CreatePersonComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePersonMutation, CreatePersonMutationVariables> mutation={CreatePersonDocument} {...props} />
    );
    

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, baseOptions);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = ApolloReactCommon.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation updatePerson($input: UpdatePersonInput!) {
  updatePerson(input: $input) {
    id
  }
}
    `;
export type UpdatePersonMutationFn = ApolloReactCommon.MutationFunction<UpdatePersonMutation, UpdatePersonMutationVariables>;
export type UpdatePersonComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePersonMutation, UpdatePersonMutationVariables>, 'mutation'>;

    export const UpdatePersonComponent = (props: UpdatePersonComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePersonMutation, UpdatePersonMutationVariables> mutation={UpdatePersonDocument} {...props} />
    );
    

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, baseOptions);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = ApolloReactCommon.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const DeletePersonDocument = gql`
    mutation deletePerson($input: DeletePersonInput!) {
  deletePerson(input: $input) {
    id
  }
}
    `;
export type DeletePersonMutationFn = ApolloReactCommon.MutationFunction<DeletePersonMutation, DeletePersonMutationVariables>;
export type DeletePersonComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeletePersonMutation, DeletePersonMutationVariables>, 'mutation'>;

    export const DeletePersonComponent = (props: DeletePersonComponentProps) => (
      <ApolloReactComponents.Mutation<DeletePersonMutation, DeletePersonMutationVariables> mutation={DeletePersonDocument} {...props} />
    );
    

/**
 * __useDeletePersonMutation__
 *
 * To run a mutation, you first call `useDeletePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonMutation, { data, loading, error }] = useDeletePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePersonMutation, DeletePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePersonMutation, DeletePersonMutationVariables>(DeletePersonDocument, baseOptions);
      }
export type DeletePersonMutationHookResult = ReturnType<typeof useDeletePersonMutation>;
export type DeletePersonMutationResult = ApolloReactCommon.MutationResult<DeletePersonMutation>;
export type DeletePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePersonMutation, DeletePersonMutationVariables>;
export const ListPlacesDocument = gql`
    query listPlaces($filter: TablePlaceFilterInput) {
  listPlaces(filter: $filter) {
    items {
      id
      name
      headcount
      personPrice
      leaderPrice
      retailPrice
    }
  }
}
    `;
export type ListPlacesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListPlacesQuery, ListPlacesQueryVariables>, 'query'>;

    export const ListPlacesComponent = (props: ListPlacesComponentProps) => (
      <ApolloReactComponents.Query<ListPlacesQuery, ListPlacesQueryVariables> query={ListPlacesDocument} {...props} />
    );
    

/**
 * __useListPlacesQuery__
 *
 * To run a query within a React component, call `useListPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPlacesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListPlacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListPlacesQuery, ListPlacesQueryVariables>) {
        return ApolloReactHooks.useQuery<ListPlacesQuery, ListPlacesQueryVariables>(ListPlacesDocument, baseOptions);
      }
export function useListPlacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListPlacesQuery, ListPlacesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListPlacesQuery, ListPlacesQueryVariables>(ListPlacesDocument, baseOptions);
        }
export type ListPlacesQueryHookResult = ReturnType<typeof useListPlacesQuery>;
export type ListPlacesLazyQueryHookResult = ReturnType<typeof useListPlacesLazyQuery>;
export type ListPlacesQueryResult = ApolloReactCommon.QueryResult<ListPlacesQuery, ListPlacesQueryVariables>;
export const GetPlaceDocument = gql`
    query getPlace($id: ID!) {
  getPlace(id: $id) {
    id
    name
    headcount
    personPrice
    leaderPrice
    retailPrice
  }
}
    `;
export type GetPlaceComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPlaceQuery, GetPlaceQueryVariables>, 'query'> & ({ variables: GetPlaceQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPlaceComponent = (props: GetPlaceComponentProps) => (
      <ApolloReactComponents.Query<GetPlaceQuery, GetPlaceQueryVariables> query={GetPlaceDocument} {...props} />
    );
    

/**
 * __useGetPlaceQuery__
 *
 * To run a query within a React component, call `useGetPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlaceQuery, GetPlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPlaceQuery, GetPlaceQueryVariables>(GetPlaceDocument, baseOptions);
      }
export function useGetPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlaceQuery, GetPlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPlaceQuery, GetPlaceQueryVariables>(GetPlaceDocument, baseOptions);
        }
export type GetPlaceQueryHookResult = ReturnType<typeof useGetPlaceQuery>;
export type GetPlaceLazyQueryHookResult = ReturnType<typeof useGetPlaceLazyQuery>;
export type GetPlaceQueryResult = ApolloReactCommon.QueryResult<GetPlaceQuery, GetPlaceQueryVariables>;
export const CreatePlaceDocument = gql`
    mutation createPlace($input: CreatePlaceInput!) {
  createPlace(input: $input) {
    id
  }
}
    `;
export type CreatePlaceMutationFn = ApolloReactCommon.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;
export type CreatePlaceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePlaceMutation, CreatePlaceMutationVariables>, 'mutation'>;

    export const CreatePlaceComponent = (props: CreatePlaceComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePlaceMutation, CreatePlaceMutationVariables> mutation={CreatePlaceDocument} {...props} />
    );
    

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, baseOptions);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = ApolloReactCommon.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const UpdatePlaceDocument = gql`
    mutation updatePlace($input: UpdatePlaceInput!) {
  updatePlace(input: $input) {
    id
  }
}
    `;
export type UpdatePlaceMutationFn = ApolloReactCommon.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export type UpdatePlaceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>, 'mutation'>;

    export const UpdatePlaceComponent = (props: UpdatePlaceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePlaceMutation, UpdatePlaceMutationVariables> mutation={UpdatePlaceDocument} {...props} />
    );
    

/**
 * __useUpdatePlaceMutation__
 *
 * To run a mutation, you first call `useUpdatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaceMutation, { data, loading, error }] = useUpdatePlaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlaceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePlaceMutation, UpdatePlaceMutationVariables>(UpdatePlaceDocument, baseOptions);
      }
export type UpdatePlaceMutationHookResult = ReturnType<typeof useUpdatePlaceMutation>;
export type UpdatePlaceMutationResult = ApolloReactCommon.MutationResult<UpdatePlaceMutation>;
export type UpdatePlaceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export const DeletePlaceDocument = gql`
    mutation deletePlace($input: DeletePlaceInput!) {
  deletePlace(input: $input) {
    id
  }
}
    `;
export type DeletePlaceMutationFn = ApolloReactCommon.MutationFunction<DeletePlaceMutation, DeletePlaceMutationVariables>;
export type DeletePlaceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeletePlaceMutation, DeletePlaceMutationVariables>, 'mutation'>;

    export const DeletePlaceComponent = (props: DeletePlaceComponentProps) => (
      <ApolloReactComponents.Mutation<DeletePlaceMutation, DeletePlaceMutationVariables> mutation={DeletePlaceDocument} {...props} />
    );
    

/**
 * __useDeletePlaceMutation__
 *
 * To run a mutation, you first call `useDeletePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaceMutation, { data, loading, error }] = useDeletePlaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePlaceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePlaceMutation, DeletePlaceMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePlaceMutation, DeletePlaceMutationVariables>(DeletePlaceDocument, baseOptions);
      }
export type DeletePlaceMutationHookResult = ReturnType<typeof useDeletePlaceMutation>;
export type DeletePlaceMutationResult = ApolloReactCommon.MutationResult<DeletePlaceMutation>;
export type DeletePlaceMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePlaceMutation, DeletePlaceMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    username
    group
    place {
      name
      headcount
      retailPrice
    }
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const ListUsersDocument = gql`
    query listUsers($place: ID!) {
  listUsers(place: $place) {
    username
    email
    group
  }
}
    `;
export type ListUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListUsersQuery, ListUsersQueryVariables>, 'query'> & ({ variables: ListUsersQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListUsersComponent = (props: ListUsersComponentProps) => (
      <ApolloReactComponents.Query<ListUsersQuery, ListUsersQueryVariables> query={ListUsersDocument} {...props} />
    );
    

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *      place: // value for 'place'
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
      }
export function useListUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    password
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($username: String!) {
  deleteUser(username: $username)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>, 'mutation'>;

    export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables> mutation={DeleteUserDocument} {...props} />
    );
    

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;