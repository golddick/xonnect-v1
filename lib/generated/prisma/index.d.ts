
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model SuperAdminSetting
 * 
 */
export type SuperAdminSetting = $Result.DefaultSelection<Prisma.$SuperAdminSettingPayload>
/**
 * Model AuthCredential
 * 
 */
export type AuthCredential = $Result.DefaultSelection<Prisma.$AuthCredentialPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Creator
 * 
 */
export type Creator = $Result.DefaultSelection<Prisma.$CreatorPayload>
/**
 * Model CreatorVideoFolder
 * 
 */
export type CreatorVideoFolder = $Result.DefaultSelection<Prisma.$CreatorVideoFolderPayload>
/**
 * Model CreatorVideo
 * 
 */
export type CreatorVideo = $Result.DefaultSelection<Prisma.$CreatorVideoPayload>
/**
 * Model CreatorVideoView
 * 
 */
export type CreatorVideoView = $Result.DefaultSelection<Prisma.$CreatorVideoViewPayload>
/**
 * Model CreatorVideoLike
 * 
 */
export type CreatorVideoLike = $Result.DefaultSelection<Prisma.$CreatorVideoLikePayload>
/**
 * Model CreatorVideoComment
 * 
 */
export type CreatorVideoComment = $Result.DefaultSelection<Prisma.$CreatorVideoCommentPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
  CREATOR: 'CREATOR',
  MEMBER: 'MEMBER',
  STAFF: 'STAFF'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SuperAdminSettingSection: {
  REVENUE: 'REVENUE',
  COMPANY_INFO: 'COMPANY_INFO'
};

export type SuperAdminSettingSection = (typeof SuperAdminSettingSection)[keyof typeof SuperAdminSettingSection]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SuperAdminSettingSection = $Enums.SuperAdminSettingSection

export const SuperAdminSettingSection: typeof $Enums.SuperAdminSettingSection

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.superAdminSetting`: Exposes CRUD operations for the **SuperAdminSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuperAdminSettings
    * const superAdminSettings = await prisma.superAdminSetting.findMany()
    * ```
    */
  get superAdminSetting(): Prisma.SuperAdminSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authCredential`: Exposes CRUD operations for the **AuthCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthCredentials
    * const authCredentials = await prisma.authCredential.findMany()
    * ```
    */
  get authCredential(): Prisma.AuthCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creator`: Exposes CRUD operations for the **Creator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Creators
    * const creators = await prisma.creator.findMany()
    * ```
    */
  get creator(): Prisma.CreatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorVideoFolder`: Exposes CRUD operations for the **CreatorVideoFolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorVideoFolders
    * const creatorVideoFolders = await prisma.creatorVideoFolder.findMany()
    * ```
    */
  get creatorVideoFolder(): Prisma.CreatorVideoFolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorVideo`: Exposes CRUD operations for the **CreatorVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorVideos
    * const creatorVideos = await prisma.creatorVideo.findMany()
    * ```
    */
  get creatorVideo(): Prisma.CreatorVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorVideoView`: Exposes CRUD operations for the **CreatorVideoView** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorVideoViews
    * const creatorVideoViews = await prisma.creatorVideoView.findMany()
    * ```
    */
  get creatorVideoView(): Prisma.CreatorVideoViewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorVideoLike`: Exposes CRUD operations for the **CreatorVideoLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorVideoLikes
    * const creatorVideoLikes = await prisma.creatorVideoLike.findMany()
    * ```
    */
  get creatorVideoLike(): Prisma.CreatorVideoLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorVideoComment`: Exposes CRUD operations for the **CreatorVideoComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorVideoComments
    * const creatorVideoComments = await prisma.creatorVideoComment.findMany()
    * ```
    */
  get creatorVideoComment(): Prisma.CreatorVideoCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    SuperAdminSetting: 'SuperAdminSetting',
    AuthCredential: 'AuthCredential',
    Category: 'Category',
    Creator: 'Creator',
    CreatorVideoFolder: 'CreatorVideoFolder',
    CreatorVideo: 'CreatorVideo',
    CreatorVideoView: 'CreatorVideoView',
    CreatorVideoLike: 'CreatorVideoLike',
    CreatorVideoComment: 'CreatorVideoComment',
    Session: 'Session',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "superAdminSetting" | "authCredential" | "category" | "creator" | "creatorVideoFolder" | "creatorVideo" | "creatorVideoView" | "creatorVideoLike" | "creatorVideoComment" | "session" | "verificationToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      SuperAdminSetting: {
        payload: Prisma.$SuperAdminSettingPayload<ExtArgs>
        fields: Prisma.SuperAdminSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuperAdminSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuperAdminSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          findFirst: {
            args: Prisma.SuperAdminSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuperAdminSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          findMany: {
            args: Prisma.SuperAdminSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>[]
          }
          create: {
            args: Prisma.SuperAdminSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          createMany: {
            args: Prisma.SuperAdminSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuperAdminSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>[]
          }
          delete: {
            args: Prisma.SuperAdminSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          update: {
            args: Prisma.SuperAdminSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          deleteMany: {
            args: Prisma.SuperAdminSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuperAdminSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuperAdminSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>[]
          }
          upsert: {
            args: Prisma.SuperAdminSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminSettingPayload>
          }
          aggregate: {
            args: Prisma.SuperAdminSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuperAdminSetting>
          }
          groupBy: {
            args: Prisma.SuperAdminSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuperAdminSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminSettingCountAggregateOutputType> | number
          }
        }
      }
      AuthCredential: {
        payload: Prisma.$AuthCredentialPayload<ExtArgs>
        fields: Prisma.AuthCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          findFirst: {
            args: Prisma.AuthCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          findMany: {
            args: Prisma.AuthCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>[]
          }
          create: {
            args: Prisma.AuthCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          createMany: {
            args: Prisma.AuthCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>[]
          }
          delete: {
            args: Prisma.AuthCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          update: {
            args: Prisma.AuthCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          deleteMany: {
            args: Prisma.AuthCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>[]
          }
          upsert: {
            args: Prisma.AuthCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthCredentialPayload>
          }
          aggregate: {
            args: Prisma.AuthCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthCredential>
          }
          groupBy: {
            args: Prisma.AuthCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<AuthCredentialCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Creator: {
        payload: Prisma.$CreatorPayload<ExtArgs>
        fields: Prisma.CreatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          findFirst: {
            args: Prisma.CreatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          findMany: {
            args: Prisma.CreatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>[]
          }
          create: {
            args: Prisma.CreatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          createMany: {
            args: Prisma.CreatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>[]
          }
          delete: {
            args: Prisma.CreatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          update: {
            args: Prisma.CreatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          deleteMany: {
            args: Prisma.CreatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>[]
          }
          upsert: {
            args: Prisma.CreatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorPayload>
          }
          aggregate: {
            args: Prisma.CreatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreator>
          }
          groupBy: {
            args: Prisma.CreatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorCountAggregateOutputType> | number
          }
        }
      }
      CreatorVideoFolder: {
        payload: Prisma.$CreatorVideoFolderPayload<ExtArgs>
        fields: Prisma.CreatorVideoFolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorVideoFolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorVideoFolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          findFirst: {
            args: Prisma.CreatorVideoFolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorVideoFolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          findMany: {
            args: Prisma.CreatorVideoFolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>[]
          }
          create: {
            args: Prisma.CreatorVideoFolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          createMany: {
            args: Prisma.CreatorVideoFolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorVideoFolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>[]
          }
          delete: {
            args: Prisma.CreatorVideoFolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          update: {
            args: Prisma.CreatorVideoFolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          deleteMany: {
            args: Prisma.CreatorVideoFolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorVideoFolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorVideoFolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>[]
          }
          upsert: {
            args: Prisma.CreatorVideoFolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoFolderPayload>
          }
          aggregate: {
            args: Prisma.CreatorVideoFolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorVideoFolder>
          }
          groupBy: {
            args: Prisma.CreatorVideoFolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoFolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorVideoFolderCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoFolderCountAggregateOutputType> | number
          }
        }
      }
      CreatorVideo: {
        payload: Prisma.$CreatorVideoPayload<ExtArgs>
        fields: Prisma.CreatorVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          findFirst: {
            args: Prisma.CreatorVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          findMany: {
            args: Prisma.CreatorVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>[]
          }
          create: {
            args: Prisma.CreatorVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          createMany: {
            args: Prisma.CreatorVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>[]
          }
          delete: {
            args: Prisma.CreatorVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          update: {
            args: Prisma.CreatorVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          deleteMany: {
            args: Prisma.CreatorVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>[]
          }
          upsert: {
            args: Prisma.CreatorVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoPayload>
          }
          aggregate: {
            args: Prisma.CreatorVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorVideo>
          }
          groupBy: {
            args: Prisma.CreatorVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorVideoCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoCountAggregateOutputType> | number
          }
        }
      }
      CreatorVideoView: {
        payload: Prisma.$CreatorVideoViewPayload<ExtArgs>
        fields: Prisma.CreatorVideoViewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorVideoViewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorVideoViewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          findFirst: {
            args: Prisma.CreatorVideoViewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorVideoViewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          findMany: {
            args: Prisma.CreatorVideoViewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>[]
          }
          create: {
            args: Prisma.CreatorVideoViewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          createMany: {
            args: Prisma.CreatorVideoViewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorVideoViewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>[]
          }
          delete: {
            args: Prisma.CreatorVideoViewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          update: {
            args: Prisma.CreatorVideoViewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          deleteMany: {
            args: Prisma.CreatorVideoViewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorVideoViewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorVideoViewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>[]
          }
          upsert: {
            args: Prisma.CreatorVideoViewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoViewPayload>
          }
          aggregate: {
            args: Prisma.CreatorVideoViewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorVideoView>
          }
          groupBy: {
            args: Prisma.CreatorVideoViewGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoViewGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorVideoViewCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoViewCountAggregateOutputType> | number
          }
        }
      }
      CreatorVideoLike: {
        payload: Prisma.$CreatorVideoLikePayload<ExtArgs>
        fields: Prisma.CreatorVideoLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorVideoLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorVideoLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          findFirst: {
            args: Prisma.CreatorVideoLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorVideoLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          findMany: {
            args: Prisma.CreatorVideoLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>[]
          }
          create: {
            args: Prisma.CreatorVideoLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          createMany: {
            args: Prisma.CreatorVideoLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorVideoLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>[]
          }
          delete: {
            args: Prisma.CreatorVideoLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          update: {
            args: Prisma.CreatorVideoLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          deleteMany: {
            args: Prisma.CreatorVideoLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorVideoLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorVideoLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>[]
          }
          upsert: {
            args: Prisma.CreatorVideoLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoLikePayload>
          }
          aggregate: {
            args: Prisma.CreatorVideoLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorVideoLike>
          }
          groupBy: {
            args: Prisma.CreatorVideoLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorVideoLikeCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoLikeCountAggregateOutputType> | number
          }
        }
      }
      CreatorVideoComment: {
        payload: Prisma.$CreatorVideoCommentPayload<ExtArgs>
        fields: Prisma.CreatorVideoCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorVideoCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorVideoCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          findFirst: {
            args: Prisma.CreatorVideoCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorVideoCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          findMany: {
            args: Prisma.CreatorVideoCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>[]
          }
          create: {
            args: Prisma.CreatorVideoCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          createMany: {
            args: Prisma.CreatorVideoCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreatorVideoCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>[]
          }
          delete: {
            args: Prisma.CreatorVideoCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          update: {
            args: Prisma.CreatorVideoCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          deleteMany: {
            args: Prisma.CreatorVideoCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorVideoCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreatorVideoCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>[]
          }
          upsert: {
            args: Prisma.CreatorVideoCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorVideoCommentPayload>
          }
          aggregate: {
            args: Prisma.CreatorVideoCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorVideoComment>
          }
          groupBy: {
            args: Prisma.CreatorVideoCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorVideoCommentCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorVideoCommentCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    superAdminSetting?: SuperAdminSettingOmit
    authCredential?: AuthCredentialOmit
    category?: CategoryOmit
    creator?: CreatorOmit
    creatorVideoFolder?: CreatorVideoFolderOmit
    creatorVideo?: CreatorVideoOmit
    creatorVideoView?: CreatorVideoViewOmit
    creatorVideoLike?: CreatorVideoLikeOmit
    creatorVideoComment?: CreatorVideoCommentOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    session: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ProfileCountOutputTypeCountSessionArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type CreatorCountOutputType
   */

  export type CreatorCountOutputType = {
    videos: number
    folders: number
  }

  export type CreatorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videos?: boolean | CreatorCountOutputTypeCountVideosArgs
    folders?: boolean | CreatorCountOutputTypeCountFoldersArgs
  }

  // Custom InputTypes
  /**
   * CreatorCountOutputType without action
   */
  export type CreatorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorCountOutputType
     */
    select?: CreatorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreatorCountOutputType without action
   */
  export type CreatorCountOutputTypeCountVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoWhereInput
  }

  /**
   * CreatorCountOutputType without action
   */
  export type CreatorCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoFolderWhereInput
  }


  /**
   * Count Type CreatorVideoFolderCountOutputType
   */

  export type CreatorVideoFolderCountOutputType = {
    videos: number
  }

  export type CreatorVideoFolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videos?: boolean | CreatorVideoFolderCountOutputTypeCountVideosArgs
  }

  // Custom InputTypes
  /**
   * CreatorVideoFolderCountOutputType without action
   */
  export type CreatorVideoFolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolderCountOutputType
     */
    select?: CreatorVideoFolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreatorVideoFolderCountOutputType without action
   */
  export type CreatorVideoFolderCountOutputTypeCountVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoWhereInput
  }


  /**
   * Count Type CreatorVideoCountOutputType
   */

  export type CreatorVideoCountOutputType = {
    views: number
    likes: number
    comments: number
  }

  export type CreatorVideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    views?: boolean | CreatorVideoCountOutputTypeCountViewsArgs
    likes?: boolean | CreatorVideoCountOutputTypeCountLikesArgs
    comments?: boolean | CreatorVideoCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * CreatorVideoCountOutputType without action
   */
  export type CreatorVideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoCountOutputType
     */
    select?: CreatorVideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreatorVideoCountOutputType without action
   */
  export type CreatorVideoCountOutputTypeCountViewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoViewWhereInput
  }

  /**
   * CreatorVideoCountOutputType without action
   */
  export type CreatorVideoCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoLikeWhereInput
  }

  /**
   * CreatorVideoCountOutputType without action
   */
  export type CreatorVideoCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    addressLat: number | null
    addressLon: number | null
    age: number | null
  }

  export type ProfileSumAggregateOutputType = {
    addressLat: number | null
    addressLon: number | null
    age: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    fullName: string | null
    avatarUrl: string | null
    bio: string | null
    addressFull: string | null
    addressLat: number | null
    addressLon: number | null
    addressType: string | null
    addressCountry: string | null
    addressState: string | null
    addressName: string | null
    age: number | null
    sex: string | null
    emailVerified: boolean | null
    hasPassword: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    fullName: string | null
    avatarUrl: string | null
    bio: string | null
    addressFull: string | null
    addressLat: number | null
    addressLon: number | null
    addressType: string | null
    addressCountry: string | null
    addressState: string | null
    addressName: string | null
    age: number | null
    sex: string | null
    emailVerified: boolean | null
    hasPassword: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    email: number
    role: number
    fullName: number
    avatarUrl: number
    bio: number
    addressFull: number
    addressLat: number
    addressLon: number
    addressType: number
    addressCountry: number
    addressState: number
    addressName: number
    age: number
    sex: number
    emailVerified: number
    hasPassword: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    addressLat?: true
    addressLon?: true
    age?: true
  }

  export type ProfileSumAggregateInputType = {
    addressLat?: true
    addressLon?: true
    age?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    fullName?: true
    avatarUrl?: true
    bio?: true
    addressFull?: true
    addressLat?: true
    addressLon?: true
    addressType?: true
    addressCountry?: true
    addressState?: true
    addressName?: true
    age?: true
    sex?: true
    emailVerified?: true
    hasPassword?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    fullName?: true
    avatarUrl?: true
    bio?: true
    addressFull?: true
    addressLat?: true
    addressLon?: true
    addressType?: true
    addressCountry?: true
    addressState?: true
    addressName?: true
    age?: true
    sex?: true
    emailVerified?: true
    hasPassword?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    fullName?: true
    avatarUrl?: true
    bio?: true
    addressFull?: true
    addressLat?: true
    addressLon?: true
    addressType?: true
    addressCountry?: true
    addressState?: true
    addressName?: true
    age?: true
    sex?: true
    emailVerified?: true
    hasPassword?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    fullName: string | null
    avatarUrl: string | null
    bio: string | null
    addressFull: string | null
    addressLat: number | null
    addressLon: number | null
    addressType: string | null
    addressCountry: string | null
    addressState: string | null
    addressName: string | null
    age: number | null
    sex: string | null
    emailVerified: boolean
    hasPassword: boolean
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    addressFull?: boolean
    addressLat?: boolean
    addressLon?: boolean
    addressType?: boolean
    addressCountry?: boolean
    addressState?: boolean
    addressName?: boolean
    age?: boolean
    sex?: boolean
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | Profile$creatorArgs<ExtArgs>
    credential?: boolean | Profile$credentialArgs<ExtArgs>
    session?: boolean | Profile$sessionArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    addressFull?: boolean
    addressLat?: boolean
    addressLon?: boolean
    addressType?: boolean
    addressCountry?: boolean
    addressState?: boolean
    addressName?: boolean
    age?: boolean
    sex?: boolean
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    addressFull?: boolean
    addressLat?: boolean
    addressLon?: boolean
    addressType?: boolean
    addressCountry?: boolean
    addressState?: boolean
    addressName?: boolean
    age?: boolean
    sex?: boolean
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    addressFull?: boolean
    addressLat?: boolean
    addressLon?: boolean
    addressType?: boolean
    addressCountry?: boolean
    addressState?: boolean
    addressName?: boolean
    age?: boolean
    sex?: boolean
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "fullName" | "avatarUrl" | "bio" | "addressFull" | "addressLat" | "addressLon" | "addressType" | "addressCountry" | "addressState" | "addressName" | "age" | "sex" | "emailVerified" | "hasPassword" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Profile$creatorArgs<ExtArgs>
    credential?: boolean | Profile$credentialArgs<ExtArgs>
    session?: boolean | Profile$sessionArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      creator: Prisma.$CreatorPayload<ExtArgs> | null
      credential: Prisma.$AuthCredentialPayload<ExtArgs> | null
      session: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      fullName: string | null
      avatarUrl: string | null
      bio: string | null
      addressFull: string | null
      addressLat: number | null
      addressLon: number | null
      addressType: string | null
      addressCountry: string | null
      addressState: string | null
      addressName: string | null
      age: number | null
      sex: string | null
      emailVerified: boolean
      hasPassword: boolean
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Profile$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Profile$creatorArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    credential<T extends Profile$credentialArgs<ExtArgs> = {}>(args?: Subset<T, Profile$credentialArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    session<T extends Profile$sessionArgs<ExtArgs> = {}>(args?: Subset<T, Profile$sessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'Role'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly addressFull: FieldRef<"Profile", 'String'>
    readonly addressLat: FieldRef<"Profile", 'Float'>
    readonly addressLon: FieldRef<"Profile", 'Float'>
    readonly addressType: FieldRef<"Profile", 'String'>
    readonly addressCountry: FieldRef<"Profile", 'String'>
    readonly addressState: FieldRef<"Profile", 'String'>
    readonly addressName: FieldRef<"Profile", 'String'>
    readonly age: FieldRef<"Profile", 'Int'>
    readonly sex: FieldRef<"Profile", 'String'>
    readonly emailVerified: FieldRef<"Profile", 'Boolean'>
    readonly hasPassword: FieldRef<"Profile", 'Boolean'>
    readonly lastLogin: FieldRef<"Profile", 'DateTime'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.creator
   */
  export type Profile$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    where?: CreatorWhereInput
  }

  /**
   * Profile.credential
   */
  export type Profile$credentialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    where?: AuthCredentialWhereInput
  }

  /**
   * Profile.session
   */
  export type Profile$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model SuperAdminSetting
   */

  export type AggregateSuperAdminSetting = {
    _count: SuperAdminSettingCountAggregateOutputType | null
    _avg: SuperAdminSettingAvgAggregateOutputType | null
    _sum: SuperAdminSettingSumAggregateOutputType | null
    _min: SuperAdminSettingMinAggregateOutputType | null
    _max: SuperAdminSettingMaxAggregateOutputType | null
  }

  export type SuperAdminSettingAvgAggregateOutputType = {
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
  }

  export type SuperAdminSettingSumAggregateOutputType = {
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
  }

  export type SuperAdminSettingMinAggregateOutputType = {
    id: string | null
    section: $Enums.SuperAdminSettingSection | null
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
    companyName: string | null
    companyEmail: string | null
    supportEmail: string | null
    companyPhone: string | null
    companyAddress: string | null
    companyWebsite: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminSettingMaxAggregateOutputType = {
    id: string | null
    section: $Enums.SuperAdminSettingSection | null
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
    companyName: string | null
    companyEmail: string | null
    supportEmail: string | null
    companyPhone: string | null
    companyAddress: string | null
    companyWebsite: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminSettingCountAggregateOutputType = {
    id: number
    section: number
    platformFeePercentage: number
    enterpriseFeePercentage: number
    minimumPayoutAmount: number
    payoutProcessingDays: number
    companyName: number
    companyEmail: number
    supportEmail: number
    companyPhone: number
    companyAddress: number
    companyWebsite: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SuperAdminSettingAvgAggregateInputType = {
    platformFeePercentage?: true
    enterpriseFeePercentage?: true
    minimumPayoutAmount?: true
    payoutProcessingDays?: true
  }

  export type SuperAdminSettingSumAggregateInputType = {
    platformFeePercentage?: true
    enterpriseFeePercentage?: true
    minimumPayoutAmount?: true
    payoutProcessingDays?: true
  }

  export type SuperAdminSettingMinAggregateInputType = {
    id?: true
    section?: true
    platformFeePercentage?: true
    enterpriseFeePercentage?: true
    minimumPayoutAmount?: true
    payoutProcessingDays?: true
    companyName?: true
    companyEmail?: true
    supportEmail?: true
    companyPhone?: true
    companyAddress?: true
    companyWebsite?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminSettingMaxAggregateInputType = {
    id?: true
    section?: true
    platformFeePercentage?: true
    enterpriseFeePercentage?: true
    minimumPayoutAmount?: true
    payoutProcessingDays?: true
    companyName?: true
    companyEmail?: true
    supportEmail?: true
    companyPhone?: true
    companyAddress?: true
    companyWebsite?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminSettingCountAggregateInputType = {
    id?: true
    section?: true
    platformFeePercentage?: true
    enterpriseFeePercentage?: true
    minimumPayoutAmount?: true
    payoutProcessingDays?: true
    companyName?: true
    companyEmail?: true
    supportEmail?: true
    companyPhone?: true
    companyAddress?: true
    companyWebsite?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SuperAdminSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuperAdminSetting to aggregate.
     */
    where?: SuperAdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdminSettings to fetch.
     */
    orderBy?: SuperAdminSettingOrderByWithRelationInput | SuperAdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuperAdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SuperAdminSettings
    **/
    _count?: true | SuperAdminSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SuperAdminSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SuperAdminSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuperAdminSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuperAdminSettingMaxAggregateInputType
  }

  export type GetSuperAdminSettingAggregateType<T extends SuperAdminSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperAdminSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperAdminSetting[P]>
      : GetScalarType<T[P], AggregateSuperAdminSetting[P]>
  }




  export type SuperAdminSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuperAdminSettingWhereInput
    orderBy?: SuperAdminSettingOrderByWithAggregationInput | SuperAdminSettingOrderByWithAggregationInput[]
    by: SuperAdminSettingScalarFieldEnum[] | SuperAdminSettingScalarFieldEnum
    having?: SuperAdminSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuperAdminSettingCountAggregateInputType | true
    _avg?: SuperAdminSettingAvgAggregateInputType
    _sum?: SuperAdminSettingSumAggregateInputType
    _min?: SuperAdminSettingMinAggregateInputType
    _max?: SuperAdminSettingMaxAggregateInputType
  }

  export type SuperAdminSettingGroupByOutputType = {
    id: string
    section: $Enums.SuperAdminSettingSection
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
    companyName: string | null
    companyEmail: string | null
    supportEmail: string | null
    companyPhone: string | null
    companyAddress: string | null
    companyWebsite: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: SuperAdminSettingCountAggregateOutputType | null
    _avg: SuperAdminSettingAvgAggregateOutputType | null
    _sum: SuperAdminSettingSumAggregateOutputType | null
    _min: SuperAdminSettingMinAggregateOutputType | null
    _max: SuperAdminSettingMaxAggregateOutputType | null
  }

  type GetSuperAdminSettingGroupByPayload<T extends SuperAdminSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuperAdminSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuperAdminSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuperAdminSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SuperAdminSettingGroupByOutputType[P]>
        }
      >
    >


  export type SuperAdminSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    platformFeePercentage?: boolean
    enterpriseFeePercentage?: boolean
    minimumPayoutAmount?: boolean
    payoutProcessingDays?: boolean
    companyName?: boolean
    companyEmail?: boolean
    supportEmail?: boolean
    companyPhone?: boolean
    companyAddress?: boolean
    companyWebsite?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["superAdminSetting"]>

  export type SuperAdminSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    platformFeePercentage?: boolean
    enterpriseFeePercentage?: boolean
    minimumPayoutAmount?: boolean
    payoutProcessingDays?: boolean
    companyName?: boolean
    companyEmail?: boolean
    supportEmail?: boolean
    companyPhone?: boolean
    companyAddress?: boolean
    companyWebsite?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["superAdminSetting"]>

  export type SuperAdminSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    platformFeePercentage?: boolean
    enterpriseFeePercentage?: boolean
    minimumPayoutAmount?: boolean
    payoutProcessingDays?: boolean
    companyName?: boolean
    companyEmail?: boolean
    supportEmail?: boolean
    companyPhone?: boolean
    companyAddress?: boolean
    companyWebsite?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["superAdminSetting"]>

  export type SuperAdminSettingSelectScalar = {
    id?: boolean
    section?: boolean
    platformFeePercentage?: boolean
    enterpriseFeePercentage?: boolean
    minimumPayoutAmount?: boolean
    payoutProcessingDays?: boolean
    companyName?: boolean
    companyEmail?: boolean
    supportEmail?: boolean
    companyPhone?: boolean
    companyAddress?: boolean
    companyWebsite?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SuperAdminSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "section" | "platformFeePercentage" | "enterpriseFeePercentage" | "minimumPayoutAmount" | "payoutProcessingDays" | "companyName" | "companyEmail" | "supportEmail" | "companyPhone" | "companyAddress" | "companyWebsite" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["superAdminSetting"]>

  export type $SuperAdminSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SuperAdminSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      section: $Enums.SuperAdminSettingSection
      platformFeePercentage: number | null
      enterpriseFeePercentage: number | null
      minimumPayoutAmount: number | null
      payoutProcessingDays: number | null
      companyName: string | null
      companyEmail: string | null
      supportEmail: string | null
      companyPhone: string | null
      companyAddress: string | null
      companyWebsite: string | null
      createdBy: string | null
      updatedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["superAdminSetting"]>
    composites: {}
  }

  type SuperAdminSettingGetPayload<S extends boolean | null | undefined | SuperAdminSettingDefaultArgs> = $Result.GetResult<Prisma.$SuperAdminSettingPayload, S>

  type SuperAdminSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuperAdminSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuperAdminSettingCountAggregateInputType | true
    }

  export interface SuperAdminSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SuperAdminSetting'], meta: { name: 'SuperAdminSetting' } }
    /**
     * Find zero or one SuperAdminSetting that matches the filter.
     * @param {SuperAdminSettingFindUniqueArgs} args - Arguments to find a SuperAdminSetting
     * @example
     * // Get one SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuperAdminSettingFindUniqueArgs>(args: SelectSubset<T, SuperAdminSettingFindUniqueArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SuperAdminSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuperAdminSettingFindUniqueOrThrowArgs} args - Arguments to find a SuperAdminSetting
     * @example
     * // Get one SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuperAdminSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SuperAdminSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuperAdminSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingFindFirstArgs} args - Arguments to find a SuperAdminSetting
     * @example
     * // Get one SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuperAdminSettingFindFirstArgs>(args?: SelectSubset<T, SuperAdminSettingFindFirstArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuperAdminSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingFindFirstOrThrowArgs} args - Arguments to find a SuperAdminSetting
     * @example
     * // Get one SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuperAdminSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SuperAdminSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SuperAdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuperAdminSettings
     * const superAdminSettings = await prisma.superAdminSetting.findMany()
     * 
     * // Get first 10 SuperAdminSettings
     * const superAdminSettings = await prisma.superAdminSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const superAdminSettingWithIdOnly = await prisma.superAdminSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuperAdminSettingFindManyArgs>(args?: SelectSubset<T, SuperAdminSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SuperAdminSetting.
     * @param {SuperAdminSettingCreateArgs} args - Arguments to create a SuperAdminSetting.
     * @example
     * // Create one SuperAdminSetting
     * const SuperAdminSetting = await prisma.superAdminSetting.create({
     *   data: {
     *     // ... data to create a SuperAdminSetting
     *   }
     * })
     * 
     */
    create<T extends SuperAdminSettingCreateArgs>(args: SelectSubset<T, SuperAdminSettingCreateArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SuperAdminSettings.
     * @param {SuperAdminSettingCreateManyArgs} args - Arguments to create many SuperAdminSettings.
     * @example
     * // Create many SuperAdminSettings
     * const superAdminSetting = await prisma.superAdminSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuperAdminSettingCreateManyArgs>(args?: SelectSubset<T, SuperAdminSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SuperAdminSettings and returns the data saved in the database.
     * @param {SuperAdminSettingCreateManyAndReturnArgs} args - Arguments to create many SuperAdminSettings.
     * @example
     * // Create many SuperAdminSettings
     * const superAdminSetting = await prisma.superAdminSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SuperAdminSettings and only return the `id`
     * const superAdminSettingWithIdOnly = await prisma.superAdminSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuperAdminSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SuperAdminSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SuperAdminSetting.
     * @param {SuperAdminSettingDeleteArgs} args - Arguments to delete one SuperAdminSetting.
     * @example
     * // Delete one SuperAdminSetting
     * const SuperAdminSetting = await prisma.superAdminSetting.delete({
     *   where: {
     *     // ... filter to delete one SuperAdminSetting
     *   }
     * })
     * 
     */
    delete<T extends SuperAdminSettingDeleteArgs>(args: SelectSubset<T, SuperAdminSettingDeleteArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SuperAdminSetting.
     * @param {SuperAdminSettingUpdateArgs} args - Arguments to update one SuperAdminSetting.
     * @example
     * // Update one SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuperAdminSettingUpdateArgs>(args: SelectSubset<T, SuperAdminSettingUpdateArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SuperAdminSettings.
     * @param {SuperAdminSettingDeleteManyArgs} args - Arguments to filter SuperAdminSettings to delete.
     * @example
     * // Delete a few SuperAdminSettings
     * const { count } = await prisma.superAdminSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuperAdminSettingDeleteManyArgs>(args?: SelectSubset<T, SuperAdminSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuperAdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuperAdminSettings
     * const superAdminSetting = await prisma.superAdminSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuperAdminSettingUpdateManyArgs>(args: SelectSubset<T, SuperAdminSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuperAdminSettings and returns the data updated in the database.
     * @param {SuperAdminSettingUpdateManyAndReturnArgs} args - Arguments to update many SuperAdminSettings.
     * @example
     * // Update many SuperAdminSettings
     * const superAdminSetting = await prisma.superAdminSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SuperAdminSettings and only return the `id`
     * const superAdminSettingWithIdOnly = await prisma.superAdminSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SuperAdminSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SuperAdminSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SuperAdminSetting.
     * @param {SuperAdminSettingUpsertArgs} args - Arguments to update or create a SuperAdminSetting.
     * @example
     * // Update or create a SuperAdminSetting
     * const superAdminSetting = await prisma.superAdminSetting.upsert({
     *   create: {
     *     // ... data to create a SuperAdminSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuperAdminSetting we want to update
     *   }
     * })
     */
    upsert<T extends SuperAdminSettingUpsertArgs>(args: SelectSubset<T, SuperAdminSettingUpsertArgs<ExtArgs>>): Prisma__SuperAdminSettingClient<$Result.GetResult<Prisma.$SuperAdminSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SuperAdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingCountArgs} args - Arguments to filter SuperAdminSettings to count.
     * @example
     * // Count the number of SuperAdminSettings
     * const count = await prisma.superAdminSetting.count({
     *   where: {
     *     // ... the filter for the SuperAdminSettings we want to count
     *   }
     * })
    **/
    count<T extends SuperAdminSettingCountArgs>(
      args?: Subset<T, SuperAdminSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuperAdminSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuperAdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuperAdminSettingAggregateArgs>(args: Subset<T, SuperAdminSettingAggregateArgs>): Prisma.PrismaPromise<GetSuperAdminSettingAggregateType<T>>

    /**
     * Group by SuperAdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuperAdminSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuperAdminSettingGroupByArgs['orderBy'] }
        : { orderBy?: SuperAdminSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuperAdminSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperAdminSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SuperAdminSetting model
   */
  readonly fields: SuperAdminSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SuperAdminSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuperAdminSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SuperAdminSetting model
   */
  interface SuperAdminSettingFieldRefs {
    readonly id: FieldRef<"SuperAdminSetting", 'String'>
    readonly section: FieldRef<"SuperAdminSetting", 'SuperAdminSettingSection'>
    readonly platformFeePercentage: FieldRef<"SuperAdminSetting", 'Int'>
    readonly enterpriseFeePercentage: FieldRef<"SuperAdminSetting", 'Int'>
    readonly minimumPayoutAmount: FieldRef<"SuperAdminSetting", 'Int'>
    readonly payoutProcessingDays: FieldRef<"SuperAdminSetting", 'Int'>
    readonly companyName: FieldRef<"SuperAdminSetting", 'String'>
    readonly companyEmail: FieldRef<"SuperAdminSetting", 'String'>
    readonly supportEmail: FieldRef<"SuperAdminSetting", 'String'>
    readonly companyPhone: FieldRef<"SuperAdminSetting", 'String'>
    readonly companyAddress: FieldRef<"SuperAdminSetting", 'String'>
    readonly companyWebsite: FieldRef<"SuperAdminSetting", 'String'>
    readonly createdBy: FieldRef<"SuperAdminSetting", 'String'>
    readonly updatedBy: FieldRef<"SuperAdminSetting", 'String'>
    readonly createdAt: FieldRef<"SuperAdminSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"SuperAdminSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SuperAdminSetting findUnique
   */
  export type SuperAdminSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which SuperAdminSetting to fetch.
     */
    where: SuperAdminSettingWhereUniqueInput
  }

  /**
   * SuperAdminSetting findUniqueOrThrow
   */
  export type SuperAdminSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which SuperAdminSetting to fetch.
     */
    where: SuperAdminSettingWhereUniqueInput
  }

  /**
   * SuperAdminSetting findFirst
   */
  export type SuperAdminSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which SuperAdminSetting to fetch.
     */
    where?: SuperAdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdminSettings to fetch.
     */
    orderBy?: SuperAdminSettingOrderByWithRelationInput | SuperAdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuperAdminSettings.
     */
    cursor?: SuperAdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuperAdminSettings.
     */
    distinct?: SuperAdminSettingScalarFieldEnum | SuperAdminSettingScalarFieldEnum[]
  }

  /**
   * SuperAdminSetting findFirstOrThrow
   */
  export type SuperAdminSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which SuperAdminSetting to fetch.
     */
    where?: SuperAdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdminSettings to fetch.
     */
    orderBy?: SuperAdminSettingOrderByWithRelationInput | SuperAdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuperAdminSettings.
     */
    cursor?: SuperAdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuperAdminSettings.
     */
    distinct?: SuperAdminSettingScalarFieldEnum | SuperAdminSettingScalarFieldEnum[]
  }

  /**
   * SuperAdminSetting findMany
   */
  export type SuperAdminSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which SuperAdminSettings to fetch.
     */
    where?: SuperAdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdminSettings to fetch.
     */
    orderBy?: SuperAdminSettingOrderByWithRelationInput | SuperAdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SuperAdminSettings.
     */
    cursor?: SuperAdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuperAdminSettings.
     */
    distinct?: SuperAdminSettingScalarFieldEnum | SuperAdminSettingScalarFieldEnum[]
  }

  /**
   * SuperAdminSetting create
   */
  export type SuperAdminSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SuperAdminSetting.
     */
    data: XOR<SuperAdminSettingCreateInput, SuperAdminSettingUncheckedCreateInput>
  }

  /**
   * SuperAdminSetting createMany
   */
  export type SuperAdminSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SuperAdminSettings.
     */
    data: SuperAdminSettingCreateManyInput | SuperAdminSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuperAdminSetting createManyAndReturn
   */
  export type SuperAdminSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SuperAdminSettings.
     */
    data: SuperAdminSettingCreateManyInput | SuperAdminSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuperAdminSetting update
   */
  export type SuperAdminSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SuperAdminSetting.
     */
    data: XOR<SuperAdminSettingUpdateInput, SuperAdminSettingUncheckedUpdateInput>
    /**
     * Choose, which SuperAdminSetting to update.
     */
    where: SuperAdminSettingWhereUniqueInput
  }

  /**
   * SuperAdminSetting updateMany
   */
  export type SuperAdminSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SuperAdminSettings.
     */
    data: XOR<SuperAdminSettingUpdateManyMutationInput, SuperAdminSettingUncheckedUpdateManyInput>
    /**
     * Filter which SuperAdminSettings to update
     */
    where?: SuperAdminSettingWhereInput
    /**
     * Limit how many SuperAdminSettings to update.
     */
    limit?: number
  }

  /**
   * SuperAdminSetting updateManyAndReturn
   */
  export type SuperAdminSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * The data used to update SuperAdminSettings.
     */
    data: XOR<SuperAdminSettingUpdateManyMutationInput, SuperAdminSettingUncheckedUpdateManyInput>
    /**
     * Filter which SuperAdminSettings to update
     */
    where?: SuperAdminSettingWhereInput
    /**
     * Limit how many SuperAdminSettings to update.
     */
    limit?: number
  }

  /**
   * SuperAdminSetting upsert
   */
  export type SuperAdminSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SuperAdminSetting to update in case it exists.
     */
    where: SuperAdminSettingWhereUniqueInput
    /**
     * In case the SuperAdminSetting found by the `where` argument doesn't exist, create a new SuperAdminSetting with this data.
     */
    create: XOR<SuperAdminSettingCreateInput, SuperAdminSettingUncheckedCreateInput>
    /**
     * In case the SuperAdminSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuperAdminSettingUpdateInput, SuperAdminSettingUncheckedUpdateInput>
  }

  /**
   * SuperAdminSetting delete
   */
  export type SuperAdminSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
    /**
     * Filter which SuperAdminSetting to delete.
     */
    where: SuperAdminSettingWhereUniqueInput
  }

  /**
   * SuperAdminSetting deleteMany
   */
  export type SuperAdminSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuperAdminSettings to delete
     */
    where?: SuperAdminSettingWhereInput
    /**
     * Limit how many SuperAdminSettings to delete.
     */
    limit?: number
  }

  /**
   * SuperAdminSetting without action
   */
  export type SuperAdminSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminSetting
     */
    select?: SuperAdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuperAdminSetting
     */
    omit?: SuperAdminSettingOmit<ExtArgs> | null
  }


  /**
   * Model AuthCredential
   */

  export type AggregateAuthCredential = {
    _count: AuthCredentialCountAggregateOutputType | null
    _min: AuthCredentialMinAggregateOutputType | null
    _max: AuthCredentialMaxAggregateOutputType | null
  }

  export type AuthCredentialMinAggregateOutputType = {
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthCredentialMaxAggregateOutputType = {
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthCredentialCountAggregateOutputType = {
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthCredentialMinAggregateInputType = {
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthCredentialMaxAggregateInputType = {
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthCredentialCountAggregateInputType = {
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthCredential to aggregate.
     */
    where?: AuthCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthCredentials to fetch.
     */
    orderBy?: AuthCredentialOrderByWithRelationInput | AuthCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthCredentials
    **/
    _count?: true | AuthCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthCredentialMaxAggregateInputType
  }

  export type GetAuthCredentialAggregateType<T extends AuthCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthCredential[P]>
      : GetScalarType<T[P], AggregateAuthCredential[P]>
  }




  export type AuthCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthCredentialWhereInput
    orderBy?: AuthCredentialOrderByWithAggregationInput | AuthCredentialOrderByWithAggregationInput[]
    by: AuthCredentialScalarFieldEnum[] | AuthCredentialScalarFieldEnum
    having?: AuthCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthCredentialCountAggregateInputType | true
    _min?: AuthCredentialMinAggregateInputType
    _max?: AuthCredentialMaxAggregateInputType
  }

  export type AuthCredentialGroupByOutputType = {
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: AuthCredentialCountAggregateOutputType | null
    _min: AuthCredentialMinAggregateOutputType | null
    _max: AuthCredentialMaxAggregateOutputType | null
  }

  type GetAuthCredentialGroupByPayload<T extends AuthCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], AuthCredentialGroupByOutputType[P]>
        }
      >
    >


  export type AuthCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authCredential"]>

  export type AuthCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authCredential"]>

  export type AuthCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authCredential"]>

  export type AuthCredentialSelectScalar = {
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["authCredential"]>
  export type AuthCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AuthCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type AuthCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $AuthCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthCredential"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authCredential"]>
    composites: {}
  }

  type AuthCredentialGetPayload<S extends boolean | null | undefined | AuthCredentialDefaultArgs> = $Result.GetResult<Prisma.$AuthCredentialPayload, S>

  type AuthCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthCredentialCountAggregateInputType | true
    }

  export interface AuthCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthCredential'], meta: { name: 'AuthCredential' } }
    /**
     * Find zero or one AuthCredential that matches the filter.
     * @param {AuthCredentialFindUniqueArgs} args - Arguments to find a AuthCredential
     * @example
     * // Get one AuthCredential
     * const authCredential = await prisma.authCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthCredentialFindUniqueArgs>(args: SelectSubset<T, AuthCredentialFindUniqueArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthCredentialFindUniqueOrThrowArgs} args - Arguments to find a AuthCredential
     * @example
     * // Get one AuthCredential
     * const authCredential = await prisma.authCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialFindFirstArgs} args - Arguments to find a AuthCredential
     * @example
     * // Get one AuthCredential
     * const authCredential = await prisma.authCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthCredentialFindFirstArgs>(args?: SelectSubset<T, AuthCredentialFindFirstArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialFindFirstOrThrowArgs} args - Arguments to find a AuthCredential
     * @example
     * // Get one AuthCredential
     * const authCredential = await prisma.authCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthCredentials
     * const authCredentials = await prisma.authCredential.findMany()
     * 
     * // Get first 10 AuthCredentials
     * const authCredentials = await prisma.authCredential.findMany({ take: 10 })
     * 
     * // Only select the `email`
     * const authCredentialWithEmailOnly = await prisma.authCredential.findMany({ select: { email: true } })
     * 
     */
    findMany<T extends AuthCredentialFindManyArgs>(args?: SelectSubset<T, AuthCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthCredential.
     * @param {AuthCredentialCreateArgs} args - Arguments to create a AuthCredential.
     * @example
     * // Create one AuthCredential
     * const AuthCredential = await prisma.authCredential.create({
     *   data: {
     *     // ... data to create a AuthCredential
     *   }
     * })
     * 
     */
    create<T extends AuthCredentialCreateArgs>(args: SelectSubset<T, AuthCredentialCreateArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthCredentials.
     * @param {AuthCredentialCreateManyArgs} args - Arguments to create many AuthCredentials.
     * @example
     * // Create many AuthCredentials
     * const authCredential = await prisma.authCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthCredentialCreateManyArgs>(args?: SelectSubset<T, AuthCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthCredentials and returns the data saved in the database.
     * @param {AuthCredentialCreateManyAndReturnArgs} args - Arguments to create many AuthCredentials.
     * @example
     * // Create many AuthCredentials
     * const authCredential = await prisma.authCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthCredentials and only return the `email`
     * const authCredentialWithEmailOnly = await prisma.authCredential.createManyAndReturn({
     *   select: { email: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthCredential.
     * @param {AuthCredentialDeleteArgs} args - Arguments to delete one AuthCredential.
     * @example
     * // Delete one AuthCredential
     * const AuthCredential = await prisma.authCredential.delete({
     *   where: {
     *     // ... filter to delete one AuthCredential
     *   }
     * })
     * 
     */
    delete<T extends AuthCredentialDeleteArgs>(args: SelectSubset<T, AuthCredentialDeleteArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthCredential.
     * @param {AuthCredentialUpdateArgs} args - Arguments to update one AuthCredential.
     * @example
     * // Update one AuthCredential
     * const authCredential = await prisma.authCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthCredentialUpdateArgs>(args: SelectSubset<T, AuthCredentialUpdateArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthCredentials.
     * @param {AuthCredentialDeleteManyArgs} args - Arguments to filter AuthCredentials to delete.
     * @example
     * // Delete a few AuthCredentials
     * const { count } = await prisma.authCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthCredentialDeleteManyArgs>(args?: SelectSubset<T, AuthCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthCredentials
     * const authCredential = await prisma.authCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthCredentialUpdateManyArgs>(args: SelectSubset<T, AuthCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthCredentials and returns the data updated in the database.
     * @param {AuthCredentialUpdateManyAndReturnArgs} args - Arguments to update many AuthCredentials.
     * @example
     * // Update many AuthCredentials
     * const authCredential = await prisma.authCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthCredentials and only return the `email`
     * const authCredentialWithEmailOnly = await prisma.authCredential.updateManyAndReturn({
     *   select: { email: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthCredential.
     * @param {AuthCredentialUpsertArgs} args - Arguments to update or create a AuthCredential.
     * @example
     * // Update or create a AuthCredential
     * const authCredential = await prisma.authCredential.upsert({
     *   create: {
     *     // ... data to create a AuthCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthCredential we want to update
     *   }
     * })
     */
    upsert<T extends AuthCredentialUpsertArgs>(args: SelectSubset<T, AuthCredentialUpsertArgs<ExtArgs>>): Prisma__AuthCredentialClient<$Result.GetResult<Prisma.$AuthCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialCountArgs} args - Arguments to filter AuthCredentials to count.
     * @example
     * // Count the number of AuthCredentials
     * const count = await prisma.authCredential.count({
     *   where: {
     *     // ... the filter for the AuthCredentials we want to count
     *   }
     * })
    **/
    count<T extends AuthCredentialCountArgs>(
      args?: Subset<T, AuthCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthCredentialAggregateArgs>(args: Subset<T, AuthCredentialAggregateArgs>): Prisma.PrismaPromise<GetAuthCredentialAggregateType<T>>

    /**
     * Group by AuthCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthCredentialGroupByArgs['orderBy'] }
        : { orderBy?: AuthCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthCredential model
   */
  readonly fields: AuthCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthCredential model
   */
  interface AuthCredentialFieldRefs {
    readonly email: FieldRef<"AuthCredential", 'String'>
    readonly passwordHash: FieldRef<"AuthCredential", 'String'>
    readonly createdAt: FieldRef<"AuthCredential", 'DateTime'>
    readonly updatedAt: FieldRef<"AuthCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthCredential findUnique
   */
  export type AuthCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter, which AuthCredential to fetch.
     */
    where: AuthCredentialWhereUniqueInput
  }

  /**
   * AuthCredential findUniqueOrThrow
   */
  export type AuthCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter, which AuthCredential to fetch.
     */
    where: AuthCredentialWhereUniqueInput
  }

  /**
   * AuthCredential findFirst
   */
  export type AuthCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter, which AuthCredential to fetch.
     */
    where?: AuthCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthCredentials to fetch.
     */
    orderBy?: AuthCredentialOrderByWithRelationInput | AuthCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthCredentials.
     */
    cursor?: AuthCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthCredentials.
     */
    distinct?: AuthCredentialScalarFieldEnum | AuthCredentialScalarFieldEnum[]
  }

  /**
   * AuthCredential findFirstOrThrow
   */
  export type AuthCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter, which AuthCredential to fetch.
     */
    where?: AuthCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthCredentials to fetch.
     */
    orderBy?: AuthCredentialOrderByWithRelationInput | AuthCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthCredentials.
     */
    cursor?: AuthCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthCredentials.
     */
    distinct?: AuthCredentialScalarFieldEnum | AuthCredentialScalarFieldEnum[]
  }

  /**
   * AuthCredential findMany
   */
  export type AuthCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter, which AuthCredentials to fetch.
     */
    where?: AuthCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthCredentials to fetch.
     */
    orderBy?: AuthCredentialOrderByWithRelationInput | AuthCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthCredentials.
     */
    cursor?: AuthCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthCredentials.
     */
    distinct?: AuthCredentialScalarFieldEnum | AuthCredentialScalarFieldEnum[]
  }

  /**
   * AuthCredential create
   */
  export type AuthCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthCredential.
     */
    data: XOR<AuthCredentialCreateInput, AuthCredentialUncheckedCreateInput>
  }

  /**
   * AuthCredential createMany
   */
  export type AuthCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthCredentials.
     */
    data: AuthCredentialCreateManyInput | AuthCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthCredential createManyAndReturn
   */
  export type AuthCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many AuthCredentials.
     */
    data: AuthCredentialCreateManyInput | AuthCredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthCredential update
   */
  export type AuthCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthCredential.
     */
    data: XOR<AuthCredentialUpdateInput, AuthCredentialUncheckedUpdateInput>
    /**
     * Choose, which AuthCredential to update.
     */
    where: AuthCredentialWhereUniqueInput
  }

  /**
   * AuthCredential updateMany
   */
  export type AuthCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthCredentials.
     */
    data: XOR<AuthCredentialUpdateManyMutationInput, AuthCredentialUncheckedUpdateManyInput>
    /**
     * Filter which AuthCredentials to update
     */
    where?: AuthCredentialWhereInput
    /**
     * Limit how many AuthCredentials to update.
     */
    limit?: number
  }

  /**
   * AuthCredential updateManyAndReturn
   */
  export type AuthCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * The data used to update AuthCredentials.
     */
    data: XOR<AuthCredentialUpdateManyMutationInput, AuthCredentialUncheckedUpdateManyInput>
    /**
     * Filter which AuthCredentials to update
     */
    where?: AuthCredentialWhereInput
    /**
     * Limit how many AuthCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthCredential upsert
   */
  export type AuthCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthCredential to update in case it exists.
     */
    where: AuthCredentialWhereUniqueInput
    /**
     * In case the AuthCredential found by the `where` argument doesn't exist, create a new AuthCredential with this data.
     */
    create: XOR<AuthCredentialCreateInput, AuthCredentialUncheckedCreateInput>
    /**
     * In case the AuthCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthCredentialUpdateInput, AuthCredentialUncheckedUpdateInput>
  }

  /**
   * AuthCredential delete
   */
  export type AuthCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
    /**
     * Filter which AuthCredential to delete.
     */
    where: AuthCredentialWhereUniqueInput
  }

  /**
   * AuthCredential deleteMany
   */
  export type AuthCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthCredentials to delete
     */
    where?: AuthCredentialWhereInput
    /**
     * Limit how many AuthCredentials to delete.
     */
    limit?: number
  }

  /**
   * AuthCredential without action
   */
  export type AuthCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthCredential
     */
    select?: AuthCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthCredential
     */
    omit?: AuthCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthCredentialInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
  }


  /**
   * Model Creator
   */

  export type AggregateCreator = {
    _count: CreatorCountAggregateOutputType | null
    _min: CreatorMinAggregateOutputType | null
    _max: CreatorMaxAggregateOutputType | null
  }

  export type CreatorMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorCountAggregateOutputType = {
    id: number
    profileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreatorMinAggregateInputType = {
    id?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorMaxAggregateInputType = {
    id?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorCountAggregateInputType = {
    id?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Creator to aggregate.
     */
    where?: CreatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Creators to fetch.
     */
    orderBy?: CreatorOrderByWithRelationInput | CreatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Creators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Creators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Creators
    **/
    _count?: true | CreatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorMaxAggregateInputType
  }

  export type GetCreatorAggregateType<T extends CreatorAggregateArgs> = {
        [P in keyof T & keyof AggregateCreator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreator[P]>
      : GetScalarType<T[P], AggregateCreator[P]>
  }




  export type CreatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorWhereInput
    orderBy?: CreatorOrderByWithAggregationInput | CreatorOrderByWithAggregationInput[]
    by: CreatorScalarFieldEnum[] | CreatorScalarFieldEnum
    having?: CreatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorCountAggregateInputType | true
    _min?: CreatorMinAggregateInputType
    _max?: CreatorMaxAggregateInputType
  }

  export type CreatorGroupByOutputType = {
    id: string
    profileId: string
    createdAt: Date
    updatedAt: Date
    _count: CreatorCountAggregateOutputType | null
    _min: CreatorMinAggregateOutputType | null
    _max: CreatorMaxAggregateOutputType | null
  }

  type GetCreatorGroupByPayload<T extends CreatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorGroupByOutputType[P]>
        }
      >
    >


  export type CreatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    videos?: boolean | Creator$videosArgs<ExtArgs>
    folders?: boolean | Creator$foldersArgs<ExtArgs>
    _count?: boolean | CreatorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creator"]>

  export type CreatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creator"]>

  export type CreatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creator"]>

  export type CreatorSelectScalar = {
    id?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["creator"]>
  export type CreatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    videos?: boolean | Creator$videosArgs<ExtArgs>
    folders?: boolean | Creator$foldersArgs<ExtArgs>
    _count?: boolean | CreatorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type CreatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $CreatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Creator"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      videos: Prisma.$CreatorVideoPayload<ExtArgs>[]
      folders: Prisma.$CreatorVideoFolderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creator"]>
    composites: {}
  }

  type CreatorGetPayload<S extends boolean | null | undefined | CreatorDefaultArgs> = $Result.GetResult<Prisma.$CreatorPayload, S>

  type CreatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorCountAggregateInputType | true
    }

  export interface CreatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Creator'], meta: { name: 'Creator' } }
    /**
     * Find zero or one Creator that matches the filter.
     * @param {CreatorFindUniqueArgs} args - Arguments to find a Creator
     * @example
     * // Get one Creator
     * const creator = await prisma.creator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorFindUniqueArgs>(args: SelectSubset<T, CreatorFindUniqueArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Creator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorFindUniqueOrThrowArgs} args - Arguments to find a Creator
     * @example
     * // Get one Creator
     * const creator = await prisma.creator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Creator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorFindFirstArgs} args - Arguments to find a Creator
     * @example
     * // Get one Creator
     * const creator = await prisma.creator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorFindFirstArgs>(args?: SelectSubset<T, CreatorFindFirstArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Creator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorFindFirstOrThrowArgs} args - Arguments to find a Creator
     * @example
     * // Get one Creator
     * const creator = await prisma.creator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Creators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Creators
     * const creators = await prisma.creator.findMany()
     * 
     * // Get first 10 Creators
     * const creators = await prisma.creator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorWithIdOnly = await prisma.creator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorFindManyArgs>(args?: SelectSubset<T, CreatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Creator.
     * @param {CreatorCreateArgs} args - Arguments to create a Creator.
     * @example
     * // Create one Creator
     * const Creator = await prisma.creator.create({
     *   data: {
     *     // ... data to create a Creator
     *   }
     * })
     * 
     */
    create<T extends CreatorCreateArgs>(args: SelectSubset<T, CreatorCreateArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Creators.
     * @param {CreatorCreateManyArgs} args - Arguments to create many Creators.
     * @example
     * // Create many Creators
     * const creator = await prisma.creator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorCreateManyArgs>(args?: SelectSubset<T, CreatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Creators and returns the data saved in the database.
     * @param {CreatorCreateManyAndReturnArgs} args - Arguments to create many Creators.
     * @example
     * // Create many Creators
     * const creator = await prisma.creator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Creators and only return the `id`
     * const creatorWithIdOnly = await prisma.creator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Creator.
     * @param {CreatorDeleteArgs} args - Arguments to delete one Creator.
     * @example
     * // Delete one Creator
     * const Creator = await prisma.creator.delete({
     *   where: {
     *     // ... filter to delete one Creator
     *   }
     * })
     * 
     */
    delete<T extends CreatorDeleteArgs>(args: SelectSubset<T, CreatorDeleteArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Creator.
     * @param {CreatorUpdateArgs} args - Arguments to update one Creator.
     * @example
     * // Update one Creator
     * const creator = await prisma.creator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorUpdateArgs>(args: SelectSubset<T, CreatorUpdateArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Creators.
     * @param {CreatorDeleteManyArgs} args - Arguments to filter Creators to delete.
     * @example
     * // Delete a few Creators
     * const { count } = await prisma.creator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorDeleteManyArgs>(args?: SelectSubset<T, CreatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Creators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Creators
     * const creator = await prisma.creator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorUpdateManyArgs>(args: SelectSubset<T, CreatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Creators and returns the data updated in the database.
     * @param {CreatorUpdateManyAndReturnArgs} args - Arguments to update many Creators.
     * @example
     * // Update many Creators
     * const creator = await prisma.creator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Creators and only return the `id`
     * const creatorWithIdOnly = await prisma.creator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Creator.
     * @param {CreatorUpsertArgs} args - Arguments to update or create a Creator.
     * @example
     * // Update or create a Creator
     * const creator = await prisma.creator.upsert({
     *   create: {
     *     // ... data to create a Creator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Creator we want to update
     *   }
     * })
     */
    upsert<T extends CreatorUpsertArgs>(args: SelectSubset<T, CreatorUpsertArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Creators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorCountArgs} args - Arguments to filter Creators to count.
     * @example
     * // Count the number of Creators
     * const count = await prisma.creator.count({
     *   where: {
     *     // ... the filter for the Creators we want to count
     *   }
     * })
    **/
    count<T extends CreatorCountArgs>(
      args?: Subset<T, CreatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Creator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorAggregateArgs>(args: Subset<T, CreatorAggregateArgs>): Prisma.PrismaPromise<GetCreatorAggregateType<T>>

    /**
     * Group by Creator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorGroupByArgs['orderBy'] }
        : { orderBy?: CreatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Creator model
   */
  readonly fields: CreatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Creator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    videos<T extends Creator$videosArgs<ExtArgs> = {}>(args?: Subset<T, Creator$videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    folders<T extends Creator$foldersArgs<ExtArgs> = {}>(args?: Subset<T, Creator$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Creator model
   */
  interface CreatorFieldRefs {
    readonly id: FieldRef<"Creator", 'String'>
    readonly profileId: FieldRef<"Creator", 'String'>
    readonly createdAt: FieldRef<"Creator", 'DateTime'>
    readonly updatedAt: FieldRef<"Creator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Creator findUnique
   */
  export type CreatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter, which Creator to fetch.
     */
    where: CreatorWhereUniqueInput
  }

  /**
   * Creator findUniqueOrThrow
   */
  export type CreatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter, which Creator to fetch.
     */
    where: CreatorWhereUniqueInput
  }

  /**
   * Creator findFirst
   */
  export type CreatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter, which Creator to fetch.
     */
    where?: CreatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Creators to fetch.
     */
    orderBy?: CreatorOrderByWithRelationInput | CreatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Creators.
     */
    cursor?: CreatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Creators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Creators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Creators.
     */
    distinct?: CreatorScalarFieldEnum | CreatorScalarFieldEnum[]
  }

  /**
   * Creator findFirstOrThrow
   */
  export type CreatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter, which Creator to fetch.
     */
    where?: CreatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Creators to fetch.
     */
    orderBy?: CreatorOrderByWithRelationInput | CreatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Creators.
     */
    cursor?: CreatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Creators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Creators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Creators.
     */
    distinct?: CreatorScalarFieldEnum | CreatorScalarFieldEnum[]
  }

  /**
   * Creator findMany
   */
  export type CreatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter, which Creators to fetch.
     */
    where?: CreatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Creators to fetch.
     */
    orderBy?: CreatorOrderByWithRelationInput | CreatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Creators.
     */
    cursor?: CreatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Creators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Creators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Creators.
     */
    distinct?: CreatorScalarFieldEnum | CreatorScalarFieldEnum[]
  }

  /**
   * Creator create
   */
  export type CreatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Creator.
     */
    data: XOR<CreatorCreateInput, CreatorUncheckedCreateInput>
  }

  /**
   * Creator createMany
   */
  export type CreatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Creators.
     */
    data: CreatorCreateManyInput | CreatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Creator createManyAndReturn
   */
  export type CreatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * The data used to create many Creators.
     */
    data: CreatorCreateManyInput | CreatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Creator update
   */
  export type CreatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Creator.
     */
    data: XOR<CreatorUpdateInput, CreatorUncheckedUpdateInput>
    /**
     * Choose, which Creator to update.
     */
    where: CreatorWhereUniqueInput
  }

  /**
   * Creator updateMany
   */
  export type CreatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Creators.
     */
    data: XOR<CreatorUpdateManyMutationInput, CreatorUncheckedUpdateManyInput>
    /**
     * Filter which Creators to update
     */
    where?: CreatorWhereInput
    /**
     * Limit how many Creators to update.
     */
    limit?: number
  }

  /**
   * Creator updateManyAndReturn
   */
  export type CreatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * The data used to update Creators.
     */
    data: XOR<CreatorUpdateManyMutationInput, CreatorUncheckedUpdateManyInput>
    /**
     * Filter which Creators to update
     */
    where?: CreatorWhereInput
    /**
     * Limit how many Creators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Creator upsert
   */
  export type CreatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Creator to update in case it exists.
     */
    where: CreatorWhereUniqueInput
    /**
     * In case the Creator found by the `where` argument doesn't exist, create a new Creator with this data.
     */
    create: XOR<CreatorCreateInput, CreatorUncheckedCreateInput>
    /**
     * In case the Creator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorUpdateInput, CreatorUncheckedUpdateInput>
  }

  /**
   * Creator delete
   */
  export type CreatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
    /**
     * Filter which Creator to delete.
     */
    where: CreatorWhereUniqueInput
  }

  /**
   * Creator deleteMany
   */
  export type CreatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Creators to delete
     */
    where?: CreatorWhereInput
    /**
     * Limit how many Creators to delete.
     */
    limit?: number
  }

  /**
   * Creator.videos
   */
  export type Creator$videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    where?: CreatorVideoWhereInput
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    cursor?: CreatorVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoScalarFieldEnum | CreatorVideoScalarFieldEnum[]
  }

  /**
   * Creator.folders
   */
  export type Creator$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    where?: CreatorVideoFolderWhereInput
    orderBy?: CreatorVideoFolderOrderByWithRelationInput | CreatorVideoFolderOrderByWithRelationInput[]
    cursor?: CreatorVideoFolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoFolderScalarFieldEnum | CreatorVideoFolderScalarFieldEnum[]
  }

  /**
   * Creator without action
   */
  export type CreatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Creator
     */
    select?: CreatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Creator
     */
    omit?: CreatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorInclude<ExtArgs> | null
  }


  /**
   * Model CreatorVideoFolder
   */

  export type AggregateCreatorVideoFolder = {
    _count: CreatorVideoFolderCountAggregateOutputType | null
    _min: CreatorVideoFolderMinAggregateOutputType | null
    _max: CreatorVideoFolderMaxAggregateOutputType | null
  }

  export type CreatorVideoFolderMinAggregateOutputType = {
    id: string | null
    creatorId: string | null
    title: string | null
    folderType: string | null
    status: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorVideoFolderMaxAggregateOutputType = {
    id: string | null
    creatorId: string | null
    title: string | null
    folderType: string | null
    status: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorVideoFolderCountAggregateOutputType = {
    id: number
    creatorId: number
    title: number
    folderType: number
    status: number
    thumbnailUrl: number
    thumbnailFileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreatorVideoFolderMinAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    folderType?: true
    status?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorVideoFolderMaxAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    folderType?: true
    status?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorVideoFolderCountAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    folderType?: true
    status?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreatorVideoFolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoFolder to aggregate.
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoFolders to fetch.
     */
    orderBy?: CreatorVideoFolderOrderByWithRelationInput | CreatorVideoFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorVideoFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorVideoFolders
    **/
    _count?: true | CreatorVideoFolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorVideoFolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorVideoFolderMaxAggregateInputType
  }

  export type GetCreatorVideoFolderAggregateType<T extends CreatorVideoFolderAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorVideoFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorVideoFolder[P]>
      : GetScalarType<T[P], AggregateCreatorVideoFolder[P]>
  }




  export type CreatorVideoFolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoFolderWhereInput
    orderBy?: CreatorVideoFolderOrderByWithAggregationInput | CreatorVideoFolderOrderByWithAggregationInput[]
    by: CreatorVideoFolderScalarFieldEnum[] | CreatorVideoFolderScalarFieldEnum
    having?: CreatorVideoFolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorVideoFolderCountAggregateInputType | true
    _min?: CreatorVideoFolderMinAggregateInputType
    _max?: CreatorVideoFolderMaxAggregateInputType
  }

  export type CreatorVideoFolderGroupByOutputType = {
    id: string
    creatorId: string
    title: string
    folderType: string
    status: string
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CreatorVideoFolderCountAggregateOutputType | null
    _min: CreatorVideoFolderMinAggregateOutputType | null
    _max: CreatorVideoFolderMaxAggregateOutputType | null
  }

  type GetCreatorVideoFolderGroupByPayload<T extends CreatorVideoFolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorVideoFolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorVideoFolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorVideoFolderGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorVideoFolderGroupByOutputType[P]>
        }
      >
    >


  export type CreatorVideoFolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    folderType?: boolean
    status?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    videos?: boolean | CreatorVideoFolder$videosArgs<ExtArgs>
    _count?: boolean | CreatorVideoFolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoFolder"]>

  export type CreatorVideoFolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    folderType?: boolean
    status?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoFolder"]>

  export type CreatorVideoFolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    folderType?: boolean
    status?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoFolder"]>

  export type CreatorVideoFolderSelectScalar = {
    id?: boolean
    creatorId?: boolean
    title?: boolean
    folderType?: boolean
    status?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreatorVideoFolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorId" | "title" | "folderType" | "status" | "thumbnailUrl" | "thumbnailFileId" | "createdAt" | "updatedAt", ExtArgs["result"]["creatorVideoFolder"]>
  export type CreatorVideoFolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    videos?: boolean | CreatorVideoFolder$videosArgs<ExtArgs>
    _count?: boolean | CreatorVideoFolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreatorVideoFolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
  }
  export type CreatorVideoFolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
  }

  export type $CreatorVideoFolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorVideoFolder"
    objects: {
      creator: Prisma.$CreatorPayload<ExtArgs>
      videos: Prisma.$CreatorVideoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorId: string
      title: string
      folderType: string
      status: string
      thumbnailUrl: string | null
      thumbnailFileId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creatorVideoFolder"]>
    composites: {}
  }

  type CreatorVideoFolderGetPayload<S extends boolean | null | undefined | CreatorVideoFolderDefaultArgs> = $Result.GetResult<Prisma.$CreatorVideoFolderPayload, S>

  type CreatorVideoFolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorVideoFolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorVideoFolderCountAggregateInputType | true
    }

  export interface CreatorVideoFolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorVideoFolder'], meta: { name: 'CreatorVideoFolder' } }
    /**
     * Find zero or one CreatorVideoFolder that matches the filter.
     * @param {CreatorVideoFolderFindUniqueArgs} args - Arguments to find a CreatorVideoFolder
     * @example
     * // Get one CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorVideoFolderFindUniqueArgs>(args: SelectSubset<T, CreatorVideoFolderFindUniqueArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorVideoFolder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorVideoFolderFindUniqueOrThrowArgs} args - Arguments to find a CreatorVideoFolder
     * @example
     * // Get one CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorVideoFolderFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorVideoFolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoFolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderFindFirstArgs} args - Arguments to find a CreatorVideoFolder
     * @example
     * // Get one CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorVideoFolderFindFirstArgs>(args?: SelectSubset<T, CreatorVideoFolderFindFirstArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoFolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderFindFirstOrThrowArgs} args - Arguments to find a CreatorVideoFolder
     * @example
     * // Get one CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorVideoFolderFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorVideoFolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorVideoFolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorVideoFolders
     * const creatorVideoFolders = await prisma.creatorVideoFolder.findMany()
     * 
     * // Get first 10 CreatorVideoFolders
     * const creatorVideoFolders = await prisma.creatorVideoFolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorVideoFolderWithIdOnly = await prisma.creatorVideoFolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorVideoFolderFindManyArgs>(args?: SelectSubset<T, CreatorVideoFolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorVideoFolder.
     * @param {CreatorVideoFolderCreateArgs} args - Arguments to create a CreatorVideoFolder.
     * @example
     * // Create one CreatorVideoFolder
     * const CreatorVideoFolder = await prisma.creatorVideoFolder.create({
     *   data: {
     *     // ... data to create a CreatorVideoFolder
     *   }
     * })
     * 
     */
    create<T extends CreatorVideoFolderCreateArgs>(args: SelectSubset<T, CreatorVideoFolderCreateArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorVideoFolders.
     * @param {CreatorVideoFolderCreateManyArgs} args - Arguments to create many CreatorVideoFolders.
     * @example
     * // Create many CreatorVideoFolders
     * const creatorVideoFolder = await prisma.creatorVideoFolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorVideoFolderCreateManyArgs>(args?: SelectSubset<T, CreatorVideoFolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreatorVideoFolders and returns the data saved in the database.
     * @param {CreatorVideoFolderCreateManyAndReturnArgs} args - Arguments to create many CreatorVideoFolders.
     * @example
     * // Create many CreatorVideoFolders
     * const creatorVideoFolder = await prisma.creatorVideoFolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreatorVideoFolders and only return the `id`
     * const creatorVideoFolderWithIdOnly = await prisma.creatorVideoFolder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorVideoFolderCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorVideoFolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreatorVideoFolder.
     * @param {CreatorVideoFolderDeleteArgs} args - Arguments to delete one CreatorVideoFolder.
     * @example
     * // Delete one CreatorVideoFolder
     * const CreatorVideoFolder = await prisma.creatorVideoFolder.delete({
     *   where: {
     *     // ... filter to delete one CreatorVideoFolder
     *   }
     * })
     * 
     */
    delete<T extends CreatorVideoFolderDeleteArgs>(args: SelectSubset<T, CreatorVideoFolderDeleteArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorVideoFolder.
     * @param {CreatorVideoFolderUpdateArgs} args - Arguments to update one CreatorVideoFolder.
     * @example
     * // Update one CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorVideoFolderUpdateArgs>(args: SelectSubset<T, CreatorVideoFolderUpdateArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorVideoFolders.
     * @param {CreatorVideoFolderDeleteManyArgs} args - Arguments to filter CreatorVideoFolders to delete.
     * @example
     * // Delete a few CreatorVideoFolders
     * const { count } = await prisma.creatorVideoFolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorVideoFolderDeleteManyArgs>(args?: SelectSubset<T, CreatorVideoFolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorVideoFolders
     * const creatorVideoFolder = await prisma.creatorVideoFolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorVideoFolderUpdateManyArgs>(args: SelectSubset<T, CreatorVideoFolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoFolders and returns the data updated in the database.
     * @param {CreatorVideoFolderUpdateManyAndReturnArgs} args - Arguments to update many CreatorVideoFolders.
     * @example
     * // Update many CreatorVideoFolders
     * const creatorVideoFolder = await prisma.creatorVideoFolder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreatorVideoFolders and only return the `id`
     * const creatorVideoFolderWithIdOnly = await prisma.creatorVideoFolder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorVideoFolderUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorVideoFolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreatorVideoFolder.
     * @param {CreatorVideoFolderUpsertArgs} args - Arguments to update or create a CreatorVideoFolder.
     * @example
     * // Update or create a CreatorVideoFolder
     * const creatorVideoFolder = await prisma.creatorVideoFolder.upsert({
     *   create: {
     *     // ... data to create a CreatorVideoFolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorVideoFolder we want to update
     *   }
     * })
     */
    upsert<T extends CreatorVideoFolderUpsertArgs>(args: SelectSubset<T, CreatorVideoFolderUpsertArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreatorVideoFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderCountArgs} args - Arguments to filter CreatorVideoFolders to count.
     * @example
     * // Count the number of CreatorVideoFolders
     * const count = await prisma.creatorVideoFolder.count({
     *   where: {
     *     // ... the filter for the CreatorVideoFolders we want to count
     *   }
     * })
    **/
    count<T extends CreatorVideoFolderCountArgs>(
      args?: Subset<T, CreatorVideoFolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorVideoFolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorVideoFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorVideoFolderAggregateArgs>(args: Subset<T, CreatorVideoFolderAggregateArgs>): Prisma.PrismaPromise<GetCreatorVideoFolderAggregateType<T>>

    /**
     * Group by CreatorVideoFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorVideoFolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorVideoFolderGroupByArgs['orderBy'] }
        : { orderBy?: CreatorVideoFolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorVideoFolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorVideoFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorVideoFolder model
   */
  readonly fields: CreatorVideoFolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorVideoFolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorVideoFolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends CreatorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorDefaultArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    videos<T extends CreatorVideoFolder$videosArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideoFolder$videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreatorVideoFolder model
   */
  interface CreatorVideoFolderFieldRefs {
    readonly id: FieldRef<"CreatorVideoFolder", 'String'>
    readonly creatorId: FieldRef<"CreatorVideoFolder", 'String'>
    readonly title: FieldRef<"CreatorVideoFolder", 'String'>
    readonly folderType: FieldRef<"CreatorVideoFolder", 'String'>
    readonly status: FieldRef<"CreatorVideoFolder", 'String'>
    readonly thumbnailUrl: FieldRef<"CreatorVideoFolder", 'String'>
    readonly thumbnailFileId: FieldRef<"CreatorVideoFolder", 'String'>
    readonly createdAt: FieldRef<"CreatorVideoFolder", 'DateTime'>
    readonly updatedAt: FieldRef<"CreatorVideoFolder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorVideoFolder findUnique
   */
  export type CreatorVideoFolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoFolder to fetch.
     */
    where: CreatorVideoFolderWhereUniqueInput
  }

  /**
   * CreatorVideoFolder findUniqueOrThrow
   */
  export type CreatorVideoFolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoFolder to fetch.
     */
    where: CreatorVideoFolderWhereUniqueInput
  }

  /**
   * CreatorVideoFolder findFirst
   */
  export type CreatorVideoFolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoFolder to fetch.
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoFolders to fetch.
     */
    orderBy?: CreatorVideoFolderOrderByWithRelationInput | CreatorVideoFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoFolders.
     */
    cursor?: CreatorVideoFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoFolders.
     */
    distinct?: CreatorVideoFolderScalarFieldEnum | CreatorVideoFolderScalarFieldEnum[]
  }

  /**
   * CreatorVideoFolder findFirstOrThrow
   */
  export type CreatorVideoFolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoFolder to fetch.
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoFolders to fetch.
     */
    orderBy?: CreatorVideoFolderOrderByWithRelationInput | CreatorVideoFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoFolders.
     */
    cursor?: CreatorVideoFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoFolders.
     */
    distinct?: CreatorVideoFolderScalarFieldEnum | CreatorVideoFolderScalarFieldEnum[]
  }

  /**
   * CreatorVideoFolder findMany
   */
  export type CreatorVideoFolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoFolders to fetch.
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoFolders to fetch.
     */
    orderBy?: CreatorVideoFolderOrderByWithRelationInput | CreatorVideoFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorVideoFolders.
     */
    cursor?: CreatorVideoFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoFolders.
     */
    distinct?: CreatorVideoFolderScalarFieldEnum | CreatorVideoFolderScalarFieldEnum[]
  }

  /**
   * CreatorVideoFolder create
   */
  export type CreatorVideoFolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorVideoFolder.
     */
    data: XOR<CreatorVideoFolderCreateInput, CreatorVideoFolderUncheckedCreateInput>
  }

  /**
   * CreatorVideoFolder createMany
   */
  export type CreatorVideoFolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorVideoFolders.
     */
    data: CreatorVideoFolderCreateManyInput | CreatorVideoFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreatorVideoFolder createManyAndReturn
   */
  export type CreatorVideoFolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * The data used to create many CreatorVideoFolders.
     */
    data: CreatorVideoFolderCreateManyInput | CreatorVideoFolderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoFolder update
   */
  export type CreatorVideoFolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorVideoFolder.
     */
    data: XOR<CreatorVideoFolderUpdateInput, CreatorVideoFolderUncheckedUpdateInput>
    /**
     * Choose, which CreatorVideoFolder to update.
     */
    where: CreatorVideoFolderWhereUniqueInput
  }

  /**
   * CreatorVideoFolder updateMany
   */
  export type CreatorVideoFolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorVideoFolders.
     */
    data: XOR<CreatorVideoFolderUpdateManyMutationInput, CreatorVideoFolderUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoFolders to update
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * Limit how many CreatorVideoFolders to update.
     */
    limit?: number
  }

  /**
   * CreatorVideoFolder updateManyAndReturn
   */
  export type CreatorVideoFolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * The data used to update CreatorVideoFolders.
     */
    data: XOR<CreatorVideoFolderUpdateManyMutationInput, CreatorVideoFolderUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoFolders to update
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * Limit how many CreatorVideoFolders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoFolder upsert
   */
  export type CreatorVideoFolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorVideoFolder to update in case it exists.
     */
    where: CreatorVideoFolderWhereUniqueInput
    /**
     * In case the CreatorVideoFolder found by the `where` argument doesn't exist, create a new CreatorVideoFolder with this data.
     */
    create: XOR<CreatorVideoFolderCreateInput, CreatorVideoFolderUncheckedCreateInput>
    /**
     * In case the CreatorVideoFolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorVideoFolderUpdateInput, CreatorVideoFolderUncheckedUpdateInput>
  }

  /**
   * CreatorVideoFolder delete
   */
  export type CreatorVideoFolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
    /**
     * Filter which CreatorVideoFolder to delete.
     */
    where: CreatorVideoFolderWhereUniqueInput
  }

  /**
   * CreatorVideoFolder deleteMany
   */
  export type CreatorVideoFolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoFolders to delete
     */
    where?: CreatorVideoFolderWhereInput
    /**
     * Limit how many CreatorVideoFolders to delete.
     */
    limit?: number
  }

  /**
   * CreatorVideoFolder.videos
   */
  export type CreatorVideoFolder$videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    where?: CreatorVideoWhereInput
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    cursor?: CreatorVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoScalarFieldEnum | CreatorVideoScalarFieldEnum[]
  }

  /**
   * CreatorVideoFolder without action
   */
  export type CreatorVideoFolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoFolder
     */
    select?: CreatorVideoFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoFolder
     */
    omit?: CreatorVideoFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoFolderInclude<ExtArgs> | null
  }


  /**
   * Model CreatorVideo
   */

  export type AggregateCreatorVideo = {
    _count: CreatorVideoCountAggregateOutputType | null
    _avg: CreatorVideoAvgAggregateOutputType | null
    _sum: CreatorVideoSumAggregateOutputType | null
    _min: CreatorVideoMinAggregateOutputType | null
    _max: CreatorVideoMaxAggregateOutputType | null
  }

  export type CreatorVideoAvgAggregateOutputType = {
    rent24Price: number | null
    rent48Price: number | null
    purchasePrice: number | null
    episodeIndex: number | null
    viewsCount: number | null
    likesCount: number | null
    commentsCount: number | null
    revenue: number | null
  }

  export type CreatorVideoSumAggregateOutputType = {
    rent24Price: number | null
    rent48Price: number | null
    purchasePrice: number | null
    episodeIndex: number | null
    viewsCount: number | null
    likesCount: number | null
    commentsCount: number | null
    revenue: number | null
  }

  export type CreatorVideoMinAggregateOutputType = {
    id: string | null
    creatorId: string | null
    folderId: string | null
    title: string | null
    description: string | null
    category: string | null
    videoUrl: string | null
    videoFileId: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    isPrivate: boolean | null
    isPremium: boolean | null
    monetizationType: string | null
    status: string | null
    publishNow: boolean | null
    scheduledAt: Date | null
    rent24Price: number | null
    rent48Price: number | null
    purchasePrice: number | null
    packageName: string | null
    episodeIndex: number | null
    duration: string | null
    allowComments: boolean | null
    ageRestriction: boolean | null
    viewsCount: number | null
    likesCount: number | null
    commentsCount: number | null
    revenue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorVideoMaxAggregateOutputType = {
    id: string | null
    creatorId: string | null
    folderId: string | null
    title: string | null
    description: string | null
    category: string | null
    videoUrl: string | null
    videoFileId: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    isPrivate: boolean | null
    isPremium: boolean | null
    monetizationType: string | null
    status: string | null
    publishNow: boolean | null
    scheduledAt: Date | null
    rent24Price: number | null
    rent48Price: number | null
    purchasePrice: number | null
    packageName: string | null
    episodeIndex: number | null
    duration: string | null
    allowComments: boolean | null
    ageRestriction: boolean | null
    viewsCount: number | null
    likesCount: number | null
    commentsCount: number | null
    revenue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorVideoCountAggregateOutputType = {
    id: number
    creatorId: number
    folderId: number
    title: number
    description: number
    category: number
    videoUrl: number
    videoFileId: number
    thumbnailUrl: number
    thumbnailFileId: number
    isPrivate: number
    isPremium: number
    monetizationType: number
    status: number
    publishNow: number
    scheduledAt: number
    rent24Price: number
    rent48Price: number
    purchasePrice: number
    tags: number
    packageName: number
    episodeIndex: number
    duration: number
    allowComments: number
    ageRestriction: number
    viewsCount: number
    likesCount: number
    commentsCount: number
    revenue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreatorVideoAvgAggregateInputType = {
    rent24Price?: true
    rent48Price?: true
    purchasePrice?: true
    episodeIndex?: true
    viewsCount?: true
    likesCount?: true
    commentsCount?: true
    revenue?: true
  }

  export type CreatorVideoSumAggregateInputType = {
    rent24Price?: true
    rent48Price?: true
    purchasePrice?: true
    episodeIndex?: true
    viewsCount?: true
    likesCount?: true
    commentsCount?: true
    revenue?: true
  }

  export type CreatorVideoMinAggregateInputType = {
    id?: true
    creatorId?: true
    folderId?: true
    title?: true
    description?: true
    category?: true
    videoUrl?: true
    videoFileId?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    isPrivate?: true
    isPremium?: true
    monetizationType?: true
    status?: true
    publishNow?: true
    scheduledAt?: true
    rent24Price?: true
    rent48Price?: true
    purchasePrice?: true
    packageName?: true
    episodeIndex?: true
    duration?: true
    allowComments?: true
    ageRestriction?: true
    viewsCount?: true
    likesCount?: true
    commentsCount?: true
    revenue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorVideoMaxAggregateInputType = {
    id?: true
    creatorId?: true
    folderId?: true
    title?: true
    description?: true
    category?: true
    videoUrl?: true
    videoFileId?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    isPrivate?: true
    isPremium?: true
    monetizationType?: true
    status?: true
    publishNow?: true
    scheduledAt?: true
    rent24Price?: true
    rent48Price?: true
    purchasePrice?: true
    packageName?: true
    episodeIndex?: true
    duration?: true
    allowComments?: true
    ageRestriction?: true
    viewsCount?: true
    likesCount?: true
    commentsCount?: true
    revenue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorVideoCountAggregateInputType = {
    id?: true
    creatorId?: true
    folderId?: true
    title?: true
    description?: true
    category?: true
    videoUrl?: true
    videoFileId?: true
    thumbnailUrl?: true
    thumbnailFileId?: true
    isPrivate?: true
    isPremium?: true
    monetizationType?: true
    status?: true
    publishNow?: true
    scheduledAt?: true
    rent24Price?: true
    rent48Price?: true
    purchasePrice?: true
    tags?: true
    packageName?: true
    episodeIndex?: true
    duration?: true
    allowComments?: true
    ageRestriction?: true
    viewsCount?: true
    likesCount?: true
    commentsCount?: true
    revenue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreatorVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideo to aggregate.
     */
    where?: CreatorVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideos to fetch.
     */
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorVideos
    **/
    _count?: true | CreatorVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreatorVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreatorVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorVideoMaxAggregateInputType
  }

  export type GetCreatorVideoAggregateType<T extends CreatorVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorVideo[P]>
      : GetScalarType<T[P], AggregateCreatorVideo[P]>
  }




  export type CreatorVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoWhereInput
    orderBy?: CreatorVideoOrderByWithAggregationInput | CreatorVideoOrderByWithAggregationInput[]
    by: CreatorVideoScalarFieldEnum[] | CreatorVideoScalarFieldEnum
    having?: CreatorVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorVideoCountAggregateInputType | true
    _avg?: CreatorVideoAvgAggregateInputType
    _sum?: CreatorVideoSumAggregateInputType
    _min?: CreatorVideoMinAggregateInputType
    _max?: CreatorVideoMaxAggregateInputType
  }

  export type CreatorVideoGroupByOutputType = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description: string | null
    category: string | null
    videoUrl: string | null
    videoFileId: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    isPrivate: boolean
    isPremium: boolean
    monetizationType: string
    status: string
    publishNow: boolean
    scheduledAt: Date | null
    rent24Price: number | null
    rent48Price: number | null
    purchasePrice: number | null
    tags: string[]
    packageName: string | null
    episodeIndex: number | null
    duration: string | null
    allowComments: boolean
    ageRestriction: boolean
    viewsCount: number
    likesCount: number
    commentsCount: number
    revenue: number
    createdAt: Date
    updatedAt: Date
    _count: CreatorVideoCountAggregateOutputType | null
    _avg: CreatorVideoAvgAggregateOutputType | null
    _sum: CreatorVideoSumAggregateOutputType | null
    _min: CreatorVideoMinAggregateOutputType | null
    _max: CreatorVideoMaxAggregateOutputType | null
  }

  type GetCreatorVideoGroupByPayload<T extends CreatorVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorVideoGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorVideoGroupByOutputType[P]>
        }
      >
    >


  export type CreatorVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    folderId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    videoUrl?: boolean
    videoFileId?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: boolean
    status?: boolean
    publishNow?: boolean
    scheduledAt?: boolean
    rent24Price?: boolean
    rent48Price?: boolean
    purchasePrice?: boolean
    tags?: boolean
    packageName?: boolean
    episodeIndex?: boolean
    duration?: boolean
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    revenue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
    views?: boolean | CreatorVideo$viewsArgs<ExtArgs>
    likes?: boolean | CreatorVideo$likesArgs<ExtArgs>
    comments?: boolean | CreatorVideo$commentsArgs<ExtArgs>
    _count?: boolean | CreatorVideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideo"]>

  export type CreatorVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    folderId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    videoUrl?: boolean
    videoFileId?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: boolean
    status?: boolean
    publishNow?: boolean
    scheduledAt?: boolean
    rent24Price?: boolean
    rent48Price?: boolean
    purchasePrice?: boolean
    tags?: boolean
    packageName?: boolean
    episodeIndex?: boolean
    duration?: boolean
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    revenue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideo"]>

  export type CreatorVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    folderId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    videoUrl?: boolean
    videoFileId?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: boolean
    status?: boolean
    publishNow?: boolean
    scheduledAt?: boolean
    rent24Price?: boolean
    rent48Price?: boolean
    purchasePrice?: boolean
    tags?: boolean
    packageName?: boolean
    episodeIndex?: boolean
    duration?: boolean
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    revenue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideo"]>

  export type CreatorVideoSelectScalar = {
    id?: boolean
    creatorId?: boolean
    folderId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    videoUrl?: boolean
    videoFileId?: boolean
    thumbnailUrl?: boolean
    thumbnailFileId?: boolean
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: boolean
    status?: boolean
    publishNow?: boolean
    scheduledAt?: boolean
    rent24Price?: boolean
    rent48Price?: boolean
    purchasePrice?: boolean
    tags?: boolean
    packageName?: boolean
    episodeIndex?: boolean
    duration?: boolean
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: boolean
    likesCount?: boolean
    commentsCount?: boolean
    revenue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreatorVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorId" | "folderId" | "title" | "description" | "category" | "videoUrl" | "videoFileId" | "thumbnailUrl" | "thumbnailFileId" | "isPrivate" | "isPremium" | "monetizationType" | "status" | "publishNow" | "scheduledAt" | "rent24Price" | "rent48Price" | "purchasePrice" | "tags" | "packageName" | "episodeIndex" | "duration" | "allowComments" | "ageRestriction" | "viewsCount" | "likesCount" | "commentsCount" | "revenue" | "createdAt" | "updatedAt", ExtArgs["result"]["creatorVideo"]>
  export type CreatorVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
    views?: boolean | CreatorVideo$viewsArgs<ExtArgs>
    likes?: boolean | CreatorVideo$likesArgs<ExtArgs>
    comments?: boolean | CreatorVideo$commentsArgs<ExtArgs>
    _count?: boolean | CreatorVideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreatorVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
  }
  export type CreatorVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | CreatorDefaultArgs<ExtArgs>
    folder?: boolean | CreatorVideoFolderDefaultArgs<ExtArgs>
  }

  export type $CreatorVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorVideo"
    objects: {
      creator: Prisma.$CreatorPayload<ExtArgs>
      folder: Prisma.$CreatorVideoFolderPayload<ExtArgs>
      views: Prisma.$CreatorVideoViewPayload<ExtArgs>[]
      likes: Prisma.$CreatorVideoLikePayload<ExtArgs>[]
      comments: Prisma.$CreatorVideoCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorId: string
      folderId: string
      title: string
      description: string | null
      category: string | null
      videoUrl: string | null
      videoFileId: string | null
      thumbnailUrl: string | null
      thumbnailFileId: string | null
      isPrivate: boolean
      isPremium: boolean
      monetizationType: string
      status: string
      publishNow: boolean
      scheduledAt: Date | null
      rent24Price: number | null
      rent48Price: number | null
      purchasePrice: number | null
      tags: string[]
      packageName: string | null
      episodeIndex: number | null
      duration: string | null
      allowComments: boolean
      ageRestriction: boolean
      viewsCount: number
      likesCount: number
      commentsCount: number
      revenue: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creatorVideo"]>
    composites: {}
  }

  type CreatorVideoGetPayload<S extends boolean | null | undefined | CreatorVideoDefaultArgs> = $Result.GetResult<Prisma.$CreatorVideoPayload, S>

  type CreatorVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorVideoCountAggregateInputType | true
    }

  export interface CreatorVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorVideo'], meta: { name: 'CreatorVideo' } }
    /**
     * Find zero or one CreatorVideo that matches the filter.
     * @param {CreatorVideoFindUniqueArgs} args - Arguments to find a CreatorVideo
     * @example
     * // Get one CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorVideoFindUniqueArgs>(args: SelectSubset<T, CreatorVideoFindUniqueArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorVideoFindUniqueOrThrowArgs} args - Arguments to find a CreatorVideo
     * @example
     * // Get one CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFindFirstArgs} args - Arguments to find a CreatorVideo
     * @example
     * // Get one CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorVideoFindFirstArgs>(args?: SelectSubset<T, CreatorVideoFindFirstArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFindFirstOrThrowArgs} args - Arguments to find a CreatorVideo
     * @example
     * // Get one CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorVideos
     * const creatorVideos = await prisma.creatorVideo.findMany()
     * 
     * // Get first 10 CreatorVideos
     * const creatorVideos = await prisma.creatorVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorVideoWithIdOnly = await prisma.creatorVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorVideoFindManyArgs>(args?: SelectSubset<T, CreatorVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorVideo.
     * @param {CreatorVideoCreateArgs} args - Arguments to create a CreatorVideo.
     * @example
     * // Create one CreatorVideo
     * const CreatorVideo = await prisma.creatorVideo.create({
     *   data: {
     *     // ... data to create a CreatorVideo
     *   }
     * })
     * 
     */
    create<T extends CreatorVideoCreateArgs>(args: SelectSubset<T, CreatorVideoCreateArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorVideos.
     * @param {CreatorVideoCreateManyArgs} args - Arguments to create many CreatorVideos.
     * @example
     * // Create many CreatorVideos
     * const creatorVideo = await prisma.creatorVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorVideoCreateManyArgs>(args?: SelectSubset<T, CreatorVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreatorVideos and returns the data saved in the database.
     * @param {CreatorVideoCreateManyAndReturnArgs} args - Arguments to create many CreatorVideos.
     * @example
     * // Create many CreatorVideos
     * const creatorVideo = await prisma.creatorVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreatorVideos and only return the `id`
     * const creatorVideoWithIdOnly = await prisma.creatorVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreatorVideo.
     * @param {CreatorVideoDeleteArgs} args - Arguments to delete one CreatorVideo.
     * @example
     * // Delete one CreatorVideo
     * const CreatorVideo = await prisma.creatorVideo.delete({
     *   where: {
     *     // ... filter to delete one CreatorVideo
     *   }
     * })
     * 
     */
    delete<T extends CreatorVideoDeleteArgs>(args: SelectSubset<T, CreatorVideoDeleteArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorVideo.
     * @param {CreatorVideoUpdateArgs} args - Arguments to update one CreatorVideo.
     * @example
     * // Update one CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorVideoUpdateArgs>(args: SelectSubset<T, CreatorVideoUpdateArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorVideos.
     * @param {CreatorVideoDeleteManyArgs} args - Arguments to filter CreatorVideos to delete.
     * @example
     * // Delete a few CreatorVideos
     * const { count } = await prisma.creatorVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorVideoDeleteManyArgs>(args?: SelectSubset<T, CreatorVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorVideos
     * const creatorVideo = await prisma.creatorVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorVideoUpdateManyArgs>(args: SelectSubset<T, CreatorVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideos and returns the data updated in the database.
     * @param {CreatorVideoUpdateManyAndReturnArgs} args - Arguments to update many CreatorVideos.
     * @example
     * // Update many CreatorVideos
     * const creatorVideo = await prisma.creatorVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreatorVideos and only return the `id`
     * const creatorVideoWithIdOnly = await prisma.creatorVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreatorVideo.
     * @param {CreatorVideoUpsertArgs} args - Arguments to update or create a CreatorVideo.
     * @example
     * // Update or create a CreatorVideo
     * const creatorVideo = await prisma.creatorVideo.upsert({
     *   create: {
     *     // ... data to create a CreatorVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorVideo we want to update
     *   }
     * })
     */
    upsert<T extends CreatorVideoUpsertArgs>(args: SelectSubset<T, CreatorVideoUpsertArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreatorVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCountArgs} args - Arguments to filter CreatorVideos to count.
     * @example
     * // Count the number of CreatorVideos
     * const count = await prisma.creatorVideo.count({
     *   where: {
     *     // ... the filter for the CreatorVideos we want to count
     *   }
     * })
    **/
    count<T extends CreatorVideoCountArgs>(
      args?: Subset<T, CreatorVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorVideoAggregateArgs>(args: Subset<T, CreatorVideoAggregateArgs>): Prisma.PrismaPromise<GetCreatorVideoAggregateType<T>>

    /**
     * Group by CreatorVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorVideoGroupByArgs['orderBy'] }
        : { orderBy?: CreatorVideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorVideo model
   */
  readonly fields: CreatorVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends CreatorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorDefaultArgs<ExtArgs>>): Prisma__CreatorClient<$Result.GetResult<Prisma.$CreatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    folder<T extends CreatorVideoFolderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideoFolderDefaultArgs<ExtArgs>>): Prisma__CreatorVideoFolderClient<$Result.GetResult<Prisma.$CreatorVideoFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    views<T extends CreatorVideo$viewsArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideo$viewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends CreatorVideo$likesArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideo$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends CreatorVideo$commentsArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideo$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreatorVideo model
   */
  interface CreatorVideoFieldRefs {
    readonly id: FieldRef<"CreatorVideo", 'String'>
    readonly creatorId: FieldRef<"CreatorVideo", 'String'>
    readonly folderId: FieldRef<"CreatorVideo", 'String'>
    readonly title: FieldRef<"CreatorVideo", 'String'>
    readonly description: FieldRef<"CreatorVideo", 'String'>
    readonly category: FieldRef<"CreatorVideo", 'String'>
    readonly videoUrl: FieldRef<"CreatorVideo", 'String'>
    readonly videoFileId: FieldRef<"CreatorVideo", 'String'>
    readonly thumbnailUrl: FieldRef<"CreatorVideo", 'String'>
    readonly thumbnailFileId: FieldRef<"CreatorVideo", 'String'>
    readonly isPrivate: FieldRef<"CreatorVideo", 'Boolean'>
    readonly isPremium: FieldRef<"CreatorVideo", 'Boolean'>
    readonly monetizationType: FieldRef<"CreatorVideo", 'String'>
    readonly status: FieldRef<"CreatorVideo", 'String'>
    readonly publishNow: FieldRef<"CreatorVideo", 'Boolean'>
    readonly scheduledAt: FieldRef<"CreatorVideo", 'DateTime'>
    readonly rent24Price: FieldRef<"CreatorVideo", 'Int'>
    readonly rent48Price: FieldRef<"CreatorVideo", 'Int'>
    readonly purchasePrice: FieldRef<"CreatorVideo", 'Int'>
    readonly tags: FieldRef<"CreatorVideo", 'String[]'>
    readonly packageName: FieldRef<"CreatorVideo", 'String'>
    readonly episodeIndex: FieldRef<"CreatorVideo", 'Int'>
    readonly duration: FieldRef<"CreatorVideo", 'String'>
    readonly allowComments: FieldRef<"CreatorVideo", 'Boolean'>
    readonly ageRestriction: FieldRef<"CreatorVideo", 'Boolean'>
    readonly viewsCount: FieldRef<"CreatorVideo", 'Int'>
    readonly likesCount: FieldRef<"CreatorVideo", 'Int'>
    readonly commentsCount: FieldRef<"CreatorVideo", 'Int'>
    readonly revenue: FieldRef<"CreatorVideo", 'Int'>
    readonly createdAt: FieldRef<"CreatorVideo", 'DateTime'>
    readonly updatedAt: FieldRef<"CreatorVideo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorVideo findUnique
   */
  export type CreatorVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideo to fetch.
     */
    where: CreatorVideoWhereUniqueInput
  }

  /**
   * CreatorVideo findUniqueOrThrow
   */
  export type CreatorVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideo to fetch.
     */
    where: CreatorVideoWhereUniqueInput
  }

  /**
   * CreatorVideo findFirst
   */
  export type CreatorVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideo to fetch.
     */
    where?: CreatorVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideos to fetch.
     */
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideos.
     */
    cursor?: CreatorVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideos.
     */
    distinct?: CreatorVideoScalarFieldEnum | CreatorVideoScalarFieldEnum[]
  }

  /**
   * CreatorVideo findFirstOrThrow
   */
  export type CreatorVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideo to fetch.
     */
    where?: CreatorVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideos to fetch.
     */
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideos.
     */
    cursor?: CreatorVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideos.
     */
    distinct?: CreatorVideoScalarFieldEnum | CreatorVideoScalarFieldEnum[]
  }

  /**
   * CreatorVideo findMany
   */
  export type CreatorVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideos to fetch.
     */
    where?: CreatorVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideos to fetch.
     */
    orderBy?: CreatorVideoOrderByWithRelationInput | CreatorVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorVideos.
     */
    cursor?: CreatorVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideos.
     */
    distinct?: CreatorVideoScalarFieldEnum | CreatorVideoScalarFieldEnum[]
  }

  /**
   * CreatorVideo create
   */
  export type CreatorVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorVideo.
     */
    data: XOR<CreatorVideoCreateInput, CreatorVideoUncheckedCreateInput>
  }

  /**
   * CreatorVideo createMany
   */
  export type CreatorVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorVideos.
     */
    data: CreatorVideoCreateManyInput | CreatorVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreatorVideo createManyAndReturn
   */
  export type CreatorVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * The data used to create many CreatorVideos.
     */
    data: CreatorVideoCreateManyInput | CreatorVideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideo update
   */
  export type CreatorVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorVideo.
     */
    data: XOR<CreatorVideoUpdateInput, CreatorVideoUncheckedUpdateInput>
    /**
     * Choose, which CreatorVideo to update.
     */
    where: CreatorVideoWhereUniqueInput
  }

  /**
   * CreatorVideo updateMany
   */
  export type CreatorVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorVideos.
     */
    data: XOR<CreatorVideoUpdateManyMutationInput, CreatorVideoUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideos to update
     */
    where?: CreatorVideoWhereInput
    /**
     * Limit how many CreatorVideos to update.
     */
    limit?: number
  }

  /**
   * CreatorVideo updateManyAndReturn
   */
  export type CreatorVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * The data used to update CreatorVideos.
     */
    data: XOR<CreatorVideoUpdateManyMutationInput, CreatorVideoUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideos to update
     */
    where?: CreatorVideoWhereInput
    /**
     * Limit how many CreatorVideos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideo upsert
   */
  export type CreatorVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorVideo to update in case it exists.
     */
    where: CreatorVideoWhereUniqueInput
    /**
     * In case the CreatorVideo found by the `where` argument doesn't exist, create a new CreatorVideo with this data.
     */
    create: XOR<CreatorVideoCreateInput, CreatorVideoUncheckedCreateInput>
    /**
     * In case the CreatorVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorVideoUpdateInput, CreatorVideoUncheckedUpdateInput>
  }

  /**
   * CreatorVideo delete
   */
  export type CreatorVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
    /**
     * Filter which CreatorVideo to delete.
     */
    where: CreatorVideoWhereUniqueInput
  }

  /**
   * CreatorVideo deleteMany
   */
  export type CreatorVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideos to delete
     */
    where?: CreatorVideoWhereInput
    /**
     * Limit how many CreatorVideos to delete.
     */
    limit?: number
  }

  /**
   * CreatorVideo.views
   */
  export type CreatorVideo$viewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    where?: CreatorVideoViewWhereInput
    orderBy?: CreatorVideoViewOrderByWithRelationInput | CreatorVideoViewOrderByWithRelationInput[]
    cursor?: CreatorVideoViewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoViewScalarFieldEnum | CreatorVideoViewScalarFieldEnum[]
  }

  /**
   * CreatorVideo.likes
   */
  export type CreatorVideo$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    where?: CreatorVideoLikeWhereInput
    orderBy?: CreatorVideoLikeOrderByWithRelationInput | CreatorVideoLikeOrderByWithRelationInput[]
    cursor?: CreatorVideoLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoLikeScalarFieldEnum | CreatorVideoLikeScalarFieldEnum[]
  }

  /**
   * CreatorVideo.comments
   */
  export type CreatorVideo$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    where?: CreatorVideoCommentWhereInput
    orderBy?: CreatorVideoCommentOrderByWithRelationInput | CreatorVideoCommentOrderByWithRelationInput[]
    cursor?: CreatorVideoCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreatorVideoCommentScalarFieldEnum | CreatorVideoCommentScalarFieldEnum[]
  }

  /**
   * CreatorVideo without action
   */
  export type CreatorVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideo
     */
    select?: CreatorVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideo
     */
    omit?: CreatorVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoInclude<ExtArgs> | null
  }


  /**
   * Model CreatorVideoView
   */

  export type AggregateCreatorVideoView = {
    _count: CreatorVideoViewCountAggregateOutputType | null
    _min: CreatorVideoViewMinAggregateOutputType | null
    _max: CreatorVideoViewMaxAggregateOutputType | null
  }

  export type CreatorVideoViewMinAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    viewerProfileId: string | null
    createdAt: Date | null
  }

  export type CreatorVideoViewMaxAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    viewerProfileId: string | null
    createdAt: Date | null
  }

  export type CreatorVideoViewCountAggregateOutputType = {
    id: number
    creatorVideoId: number
    viewerProfileId: number
    createdAt: number
    _all: number
  }


  export type CreatorVideoViewMinAggregateInputType = {
    id?: true
    creatorVideoId?: true
    viewerProfileId?: true
    createdAt?: true
  }

  export type CreatorVideoViewMaxAggregateInputType = {
    id?: true
    creatorVideoId?: true
    viewerProfileId?: true
    createdAt?: true
  }

  export type CreatorVideoViewCountAggregateInputType = {
    id?: true
    creatorVideoId?: true
    viewerProfileId?: true
    createdAt?: true
    _all?: true
  }

  export type CreatorVideoViewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoView to aggregate.
     */
    where?: CreatorVideoViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoViews to fetch.
     */
    orderBy?: CreatorVideoViewOrderByWithRelationInput | CreatorVideoViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorVideoViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorVideoViews
    **/
    _count?: true | CreatorVideoViewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorVideoViewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorVideoViewMaxAggregateInputType
  }

  export type GetCreatorVideoViewAggregateType<T extends CreatorVideoViewAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorVideoView]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorVideoView[P]>
      : GetScalarType<T[P], AggregateCreatorVideoView[P]>
  }




  export type CreatorVideoViewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoViewWhereInput
    orderBy?: CreatorVideoViewOrderByWithAggregationInput | CreatorVideoViewOrderByWithAggregationInput[]
    by: CreatorVideoViewScalarFieldEnum[] | CreatorVideoViewScalarFieldEnum
    having?: CreatorVideoViewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorVideoViewCountAggregateInputType | true
    _min?: CreatorVideoViewMinAggregateInputType
    _max?: CreatorVideoViewMaxAggregateInputType
  }

  export type CreatorVideoViewGroupByOutputType = {
    id: string
    creatorVideoId: string
    viewerProfileId: string | null
    createdAt: Date
    _count: CreatorVideoViewCountAggregateOutputType | null
    _min: CreatorVideoViewMinAggregateOutputType | null
    _max: CreatorVideoViewMaxAggregateOutputType | null
  }

  type GetCreatorVideoViewGroupByPayload<T extends CreatorVideoViewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorVideoViewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorVideoViewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorVideoViewGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorVideoViewGroupByOutputType[P]>
        }
      >
    >


  export type CreatorVideoViewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    viewerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoView"]>

  export type CreatorVideoViewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    viewerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoView"]>

  export type CreatorVideoViewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    viewerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoView"]>

  export type CreatorVideoViewSelectScalar = {
    id?: boolean
    creatorVideoId?: boolean
    viewerProfileId?: boolean
    createdAt?: boolean
  }

  export type CreatorVideoViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorVideoId" | "viewerProfileId" | "createdAt", ExtArgs["result"]["creatorVideoView"]>
  export type CreatorVideoViewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoViewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoViewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }

  export type $CreatorVideoViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorVideoView"
    objects: {
      creatorVideo: Prisma.$CreatorVideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorVideoId: string
      viewerProfileId: string | null
      createdAt: Date
    }, ExtArgs["result"]["creatorVideoView"]>
    composites: {}
  }

  type CreatorVideoViewGetPayload<S extends boolean | null | undefined | CreatorVideoViewDefaultArgs> = $Result.GetResult<Prisma.$CreatorVideoViewPayload, S>

  type CreatorVideoViewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorVideoViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorVideoViewCountAggregateInputType | true
    }

  export interface CreatorVideoViewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorVideoView'], meta: { name: 'CreatorVideoView' } }
    /**
     * Find zero or one CreatorVideoView that matches the filter.
     * @param {CreatorVideoViewFindUniqueArgs} args - Arguments to find a CreatorVideoView
     * @example
     * // Get one CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorVideoViewFindUniqueArgs>(args: SelectSubset<T, CreatorVideoViewFindUniqueArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorVideoView that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorVideoViewFindUniqueOrThrowArgs} args - Arguments to find a CreatorVideoView
     * @example
     * // Get one CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorVideoViewFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorVideoViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoView that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewFindFirstArgs} args - Arguments to find a CreatorVideoView
     * @example
     * // Get one CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorVideoViewFindFirstArgs>(args?: SelectSubset<T, CreatorVideoViewFindFirstArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoView that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewFindFirstOrThrowArgs} args - Arguments to find a CreatorVideoView
     * @example
     * // Get one CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorVideoViewFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorVideoViewFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorVideoViews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorVideoViews
     * const creatorVideoViews = await prisma.creatorVideoView.findMany()
     * 
     * // Get first 10 CreatorVideoViews
     * const creatorVideoViews = await prisma.creatorVideoView.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorVideoViewWithIdOnly = await prisma.creatorVideoView.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorVideoViewFindManyArgs>(args?: SelectSubset<T, CreatorVideoViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorVideoView.
     * @param {CreatorVideoViewCreateArgs} args - Arguments to create a CreatorVideoView.
     * @example
     * // Create one CreatorVideoView
     * const CreatorVideoView = await prisma.creatorVideoView.create({
     *   data: {
     *     // ... data to create a CreatorVideoView
     *   }
     * })
     * 
     */
    create<T extends CreatorVideoViewCreateArgs>(args: SelectSubset<T, CreatorVideoViewCreateArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorVideoViews.
     * @param {CreatorVideoViewCreateManyArgs} args - Arguments to create many CreatorVideoViews.
     * @example
     * // Create many CreatorVideoViews
     * const creatorVideoView = await prisma.creatorVideoView.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorVideoViewCreateManyArgs>(args?: SelectSubset<T, CreatorVideoViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreatorVideoViews and returns the data saved in the database.
     * @param {CreatorVideoViewCreateManyAndReturnArgs} args - Arguments to create many CreatorVideoViews.
     * @example
     * // Create many CreatorVideoViews
     * const creatorVideoView = await prisma.creatorVideoView.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreatorVideoViews and only return the `id`
     * const creatorVideoViewWithIdOnly = await prisma.creatorVideoView.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorVideoViewCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorVideoViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreatorVideoView.
     * @param {CreatorVideoViewDeleteArgs} args - Arguments to delete one CreatorVideoView.
     * @example
     * // Delete one CreatorVideoView
     * const CreatorVideoView = await prisma.creatorVideoView.delete({
     *   where: {
     *     // ... filter to delete one CreatorVideoView
     *   }
     * })
     * 
     */
    delete<T extends CreatorVideoViewDeleteArgs>(args: SelectSubset<T, CreatorVideoViewDeleteArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorVideoView.
     * @param {CreatorVideoViewUpdateArgs} args - Arguments to update one CreatorVideoView.
     * @example
     * // Update one CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorVideoViewUpdateArgs>(args: SelectSubset<T, CreatorVideoViewUpdateArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorVideoViews.
     * @param {CreatorVideoViewDeleteManyArgs} args - Arguments to filter CreatorVideoViews to delete.
     * @example
     * // Delete a few CreatorVideoViews
     * const { count } = await prisma.creatorVideoView.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorVideoViewDeleteManyArgs>(args?: SelectSubset<T, CreatorVideoViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorVideoViews
     * const creatorVideoView = await prisma.creatorVideoView.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorVideoViewUpdateManyArgs>(args: SelectSubset<T, CreatorVideoViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoViews and returns the data updated in the database.
     * @param {CreatorVideoViewUpdateManyAndReturnArgs} args - Arguments to update many CreatorVideoViews.
     * @example
     * // Update many CreatorVideoViews
     * const creatorVideoView = await prisma.creatorVideoView.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreatorVideoViews and only return the `id`
     * const creatorVideoViewWithIdOnly = await prisma.creatorVideoView.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorVideoViewUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorVideoViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreatorVideoView.
     * @param {CreatorVideoViewUpsertArgs} args - Arguments to update or create a CreatorVideoView.
     * @example
     * // Update or create a CreatorVideoView
     * const creatorVideoView = await prisma.creatorVideoView.upsert({
     *   create: {
     *     // ... data to create a CreatorVideoView
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorVideoView we want to update
     *   }
     * })
     */
    upsert<T extends CreatorVideoViewUpsertArgs>(args: SelectSubset<T, CreatorVideoViewUpsertArgs<ExtArgs>>): Prisma__CreatorVideoViewClient<$Result.GetResult<Prisma.$CreatorVideoViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreatorVideoViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewCountArgs} args - Arguments to filter CreatorVideoViews to count.
     * @example
     * // Count the number of CreatorVideoViews
     * const count = await prisma.creatorVideoView.count({
     *   where: {
     *     // ... the filter for the CreatorVideoViews we want to count
     *   }
     * })
    **/
    count<T extends CreatorVideoViewCountArgs>(
      args?: Subset<T, CreatorVideoViewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorVideoViewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorVideoView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorVideoViewAggregateArgs>(args: Subset<T, CreatorVideoViewAggregateArgs>): Prisma.PrismaPromise<GetCreatorVideoViewAggregateType<T>>

    /**
     * Group by CreatorVideoView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoViewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorVideoViewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorVideoViewGroupByArgs['orderBy'] }
        : { orderBy?: CreatorVideoViewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorVideoViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorVideoViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorVideoView model
   */
  readonly fields: CreatorVideoViewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorVideoView.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorVideoViewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creatorVideo<T extends CreatorVideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideoDefaultArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreatorVideoView model
   */
  interface CreatorVideoViewFieldRefs {
    readonly id: FieldRef<"CreatorVideoView", 'String'>
    readonly creatorVideoId: FieldRef<"CreatorVideoView", 'String'>
    readonly viewerProfileId: FieldRef<"CreatorVideoView", 'String'>
    readonly createdAt: FieldRef<"CreatorVideoView", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorVideoView findUnique
   */
  export type CreatorVideoViewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoView to fetch.
     */
    where: CreatorVideoViewWhereUniqueInput
  }

  /**
   * CreatorVideoView findUniqueOrThrow
   */
  export type CreatorVideoViewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoView to fetch.
     */
    where: CreatorVideoViewWhereUniqueInput
  }

  /**
   * CreatorVideoView findFirst
   */
  export type CreatorVideoViewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoView to fetch.
     */
    where?: CreatorVideoViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoViews to fetch.
     */
    orderBy?: CreatorVideoViewOrderByWithRelationInput | CreatorVideoViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoViews.
     */
    cursor?: CreatorVideoViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoViews.
     */
    distinct?: CreatorVideoViewScalarFieldEnum | CreatorVideoViewScalarFieldEnum[]
  }

  /**
   * CreatorVideoView findFirstOrThrow
   */
  export type CreatorVideoViewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoView to fetch.
     */
    where?: CreatorVideoViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoViews to fetch.
     */
    orderBy?: CreatorVideoViewOrderByWithRelationInput | CreatorVideoViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoViews.
     */
    cursor?: CreatorVideoViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoViews.
     */
    distinct?: CreatorVideoViewScalarFieldEnum | CreatorVideoViewScalarFieldEnum[]
  }

  /**
   * CreatorVideoView findMany
   */
  export type CreatorVideoViewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoViews to fetch.
     */
    where?: CreatorVideoViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoViews to fetch.
     */
    orderBy?: CreatorVideoViewOrderByWithRelationInput | CreatorVideoViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorVideoViews.
     */
    cursor?: CreatorVideoViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoViews.
     */
    distinct?: CreatorVideoViewScalarFieldEnum | CreatorVideoViewScalarFieldEnum[]
  }

  /**
   * CreatorVideoView create
   */
  export type CreatorVideoViewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorVideoView.
     */
    data: XOR<CreatorVideoViewCreateInput, CreatorVideoViewUncheckedCreateInput>
  }

  /**
   * CreatorVideoView createMany
   */
  export type CreatorVideoViewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorVideoViews.
     */
    data: CreatorVideoViewCreateManyInput | CreatorVideoViewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreatorVideoView createManyAndReturn
   */
  export type CreatorVideoViewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * The data used to create many CreatorVideoViews.
     */
    data: CreatorVideoViewCreateManyInput | CreatorVideoViewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoView update
   */
  export type CreatorVideoViewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorVideoView.
     */
    data: XOR<CreatorVideoViewUpdateInput, CreatorVideoViewUncheckedUpdateInput>
    /**
     * Choose, which CreatorVideoView to update.
     */
    where: CreatorVideoViewWhereUniqueInput
  }

  /**
   * CreatorVideoView updateMany
   */
  export type CreatorVideoViewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorVideoViews.
     */
    data: XOR<CreatorVideoViewUpdateManyMutationInput, CreatorVideoViewUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoViews to update
     */
    where?: CreatorVideoViewWhereInput
    /**
     * Limit how many CreatorVideoViews to update.
     */
    limit?: number
  }

  /**
   * CreatorVideoView updateManyAndReturn
   */
  export type CreatorVideoViewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * The data used to update CreatorVideoViews.
     */
    data: XOR<CreatorVideoViewUpdateManyMutationInput, CreatorVideoViewUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoViews to update
     */
    where?: CreatorVideoViewWhereInput
    /**
     * Limit how many CreatorVideoViews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoView upsert
   */
  export type CreatorVideoViewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorVideoView to update in case it exists.
     */
    where: CreatorVideoViewWhereUniqueInput
    /**
     * In case the CreatorVideoView found by the `where` argument doesn't exist, create a new CreatorVideoView with this data.
     */
    create: XOR<CreatorVideoViewCreateInput, CreatorVideoViewUncheckedCreateInput>
    /**
     * In case the CreatorVideoView was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorVideoViewUpdateInput, CreatorVideoViewUncheckedUpdateInput>
  }

  /**
   * CreatorVideoView delete
   */
  export type CreatorVideoViewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
    /**
     * Filter which CreatorVideoView to delete.
     */
    where: CreatorVideoViewWhereUniqueInput
  }

  /**
   * CreatorVideoView deleteMany
   */
  export type CreatorVideoViewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoViews to delete
     */
    where?: CreatorVideoViewWhereInput
    /**
     * Limit how many CreatorVideoViews to delete.
     */
    limit?: number
  }

  /**
   * CreatorVideoView without action
   */
  export type CreatorVideoViewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoView
     */
    select?: CreatorVideoViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoView
     */
    omit?: CreatorVideoViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoViewInclude<ExtArgs> | null
  }


  /**
   * Model CreatorVideoLike
   */

  export type AggregateCreatorVideoLike = {
    _count: CreatorVideoLikeCountAggregateOutputType | null
    _min: CreatorVideoLikeMinAggregateOutputType | null
    _max: CreatorVideoLikeMaxAggregateOutputType | null
  }

  export type CreatorVideoLikeMinAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    likerProfileId: string | null
    createdAt: Date | null
  }

  export type CreatorVideoLikeMaxAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    likerProfileId: string | null
    createdAt: Date | null
  }

  export type CreatorVideoLikeCountAggregateOutputType = {
    id: number
    creatorVideoId: number
    likerProfileId: number
    createdAt: number
    _all: number
  }


  export type CreatorVideoLikeMinAggregateInputType = {
    id?: true
    creatorVideoId?: true
    likerProfileId?: true
    createdAt?: true
  }

  export type CreatorVideoLikeMaxAggregateInputType = {
    id?: true
    creatorVideoId?: true
    likerProfileId?: true
    createdAt?: true
  }

  export type CreatorVideoLikeCountAggregateInputType = {
    id?: true
    creatorVideoId?: true
    likerProfileId?: true
    createdAt?: true
    _all?: true
  }

  export type CreatorVideoLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoLike to aggregate.
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoLikes to fetch.
     */
    orderBy?: CreatorVideoLikeOrderByWithRelationInput | CreatorVideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorVideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorVideoLikes
    **/
    _count?: true | CreatorVideoLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorVideoLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorVideoLikeMaxAggregateInputType
  }

  export type GetCreatorVideoLikeAggregateType<T extends CreatorVideoLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorVideoLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorVideoLike[P]>
      : GetScalarType<T[P], AggregateCreatorVideoLike[P]>
  }




  export type CreatorVideoLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoLikeWhereInput
    orderBy?: CreatorVideoLikeOrderByWithAggregationInput | CreatorVideoLikeOrderByWithAggregationInput[]
    by: CreatorVideoLikeScalarFieldEnum[] | CreatorVideoLikeScalarFieldEnum
    having?: CreatorVideoLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorVideoLikeCountAggregateInputType | true
    _min?: CreatorVideoLikeMinAggregateInputType
    _max?: CreatorVideoLikeMaxAggregateInputType
  }

  export type CreatorVideoLikeGroupByOutputType = {
    id: string
    creatorVideoId: string
    likerProfileId: string | null
    createdAt: Date
    _count: CreatorVideoLikeCountAggregateOutputType | null
    _min: CreatorVideoLikeMinAggregateOutputType | null
    _max: CreatorVideoLikeMaxAggregateOutputType | null
  }

  type GetCreatorVideoLikeGroupByPayload<T extends CreatorVideoLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorVideoLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorVideoLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorVideoLikeGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorVideoLikeGroupByOutputType[P]>
        }
      >
    >


  export type CreatorVideoLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    likerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoLike"]>

  export type CreatorVideoLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    likerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoLike"]>

  export type CreatorVideoLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    likerProfileId?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoLike"]>

  export type CreatorVideoLikeSelectScalar = {
    id?: boolean
    creatorVideoId?: boolean
    likerProfileId?: boolean
    createdAt?: boolean
  }

  export type CreatorVideoLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorVideoId" | "likerProfileId" | "createdAt", ExtArgs["result"]["creatorVideoLike"]>
  export type CreatorVideoLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }

  export type $CreatorVideoLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorVideoLike"
    objects: {
      creatorVideo: Prisma.$CreatorVideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorVideoId: string
      likerProfileId: string | null
      createdAt: Date
    }, ExtArgs["result"]["creatorVideoLike"]>
    composites: {}
  }

  type CreatorVideoLikeGetPayload<S extends boolean | null | undefined | CreatorVideoLikeDefaultArgs> = $Result.GetResult<Prisma.$CreatorVideoLikePayload, S>

  type CreatorVideoLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorVideoLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorVideoLikeCountAggregateInputType | true
    }

  export interface CreatorVideoLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorVideoLike'], meta: { name: 'CreatorVideoLike' } }
    /**
     * Find zero or one CreatorVideoLike that matches the filter.
     * @param {CreatorVideoLikeFindUniqueArgs} args - Arguments to find a CreatorVideoLike
     * @example
     * // Get one CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorVideoLikeFindUniqueArgs>(args: SelectSubset<T, CreatorVideoLikeFindUniqueArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorVideoLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorVideoLikeFindUniqueOrThrowArgs} args - Arguments to find a CreatorVideoLike
     * @example
     * // Get one CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorVideoLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorVideoLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeFindFirstArgs} args - Arguments to find a CreatorVideoLike
     * @example
     * // Get one CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorVideoLikeFindFirstArgs>(args?: SelectSubset<T, CreatorVideoLikeFindFirstArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeFindFirstOrThrowArgs} args - Arguments to find a CreatorVideoLike
     * @example
     * // Get one CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorVideoLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorVideoLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorVideoLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorVideoLikes
     * const creatorVideoLikes = await prisma.creatorVideoLike.findMany()
     * 
     * // Get first 10 CreatorVideoLikes
     * const creatorVideoLikes = await prisma.creatorVideoLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorVideoLikeWithIdOnly = await prisma.creatorVideoLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorVideoLikeFindManyArgs>(args?: SelectSubset<T, CreatorVideoLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorVideoLike.
     * @param {CreatorVideoLikeCreateArgs} args - Arguments to create a CreatorVideoLike.
     * @example
     * // Create one CreatorVideoLike
     * const CreatorVideoLike = await prisma.creatorVideoLike.create({
     *   data: {
     *     // ... data to create a CreatorVideoLike
     *   }
     * })
     * 
     */
    create<T extends CreatorVideoLikeCreateArgs>(args: SelectSubset<T, CreatorVideoLikeCreateArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorVideoLikes.
     * @param {CreatorVideoLikeCreateManyArgs} args - Arguments to create many CreatorVideoLikes.
     * @example
     * // Create many CreatorVideoLikes
     * const creatorVideoLike = await prisma.creatorVideoLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorVideoLikeCreateManyArgs>(args?: SelectSubset<T, CreatorVideoLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreatorVideoLikes and returns the data saved in the database.
     * @param {CreatorVideoLikeCreateManyAndReturnArgs} args - Arguments to create many CreatorVideoLikes.
     * @example
     * // Create many CreatorVideoLikes
     * const creatorVideoLike = await prisma.creatorVideoLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreatorVideoLikes and only return the `id`
     * const creatorVideoLikeWithIdOnly = await prisma.creatorVideoLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorVideoLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorVideoLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreatorVideoLike.
     * @param {CreatorVideoLikeDeleteArgs} args - Arguments to delete one CreatorVideoLike.
     * @example
     * // Delete one CreatorVideoLike
     * const CreatorVideoLike = await prisma.creatorVideoLike.delete({
     *   where: {
     *     // ... filter to delete one CreatorVideoLike
     *   }
     * })
     * 
     */
    delete<T extends CreatorVideoLikeDeleteArgs>(args: SelectSubset<T, CreatorVideoLikeDeleteArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorVideoLike.
     * @param {CreatorVideoLikeUpdateArgs} args - Arguments to update one CreatorVideoLike.
     * @example
     * // Update one CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorVideoLikeUpdateArgs>(args: SelectSubset<T, CreatorVideoLikeUpdateArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorVideoLikes.
     * @param {CreatorVideoLikeDeleteManyArgs} args - Arguments to filter CreatorVideoLikes to delete.
     * @example
     * // Delete a few CreatorVideoLikes
     * const { count } = await prisma.creatorVideoLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorVideoLikeDeleteManyArgs>(args?: SelectSubset<T, CreatorVideoLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorVideoLikes
     * const creatorVideoLike = await prisma.creatorVideoLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorVideoLikeUpdateManyArgs>(args: SelectSubset<T, CreatorVideoLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoLikes and returns the data updated in the database.
     * @param {CreatorVideoLikeUpdateManyAndReturnArgs} args - Arguments to update many CreatorVideoLikes.
     * @example
     * // Update many CreatorVideoLikes
     * const creatorVideoLike = await prisma.creatorVideoLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreatorVideoLikes and only return the `id`
     * const creatorVideoLikeWithIdOnly = await prisma.creatorVideoLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorVideoLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorVideoLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreatorVideoLike.
     * @param {CreatorVideoLikeUpsertArgs} args - Arguments to update or create a CreatorVideoLike.
     * @example
     * // Update or create a CreatorVideoLike
     * const creatorVideoLike = await prisma.creatorVideoLike.upsert({
     *   create: {
     *     // ... data to create a CreatorVideoLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorVideoLike we want to update
     *   }
     * })
     */
    upsert<T extends CreatorVideoLikeUpsertArgs>(args: SelectSubset<T, CreatorVideoLikeUpsertArgs<ExtArgs>>): Prisma__CreatorVideoLikeClient<$Result.GetResult<Prisma.$CreatorVideoLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreatorVideoLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeCountArgs} args - Arguments to filter CreatorVideoLikes to count.
     * @example
     * // Count the number of CreatorVideoLikes
     * const count = await prisma.creatorVideoLike.count({
     *   where: {
     *     // ... the filter for the CreatorVideoLikes we want to count
     *   }
     * })
    **/
    count<T extends CreatorVideoLikeCountArgs>(
      args?: Subset<T, CreatorVideoLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorVideoLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorVideoLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorVideoLikeAggregateArgs>(args: Subset<T, CreatorVideoLikeAggregateArgs>): Prisma.PrismaPromise<GetCreatorVideoLikeAggregateType<T>>

    /**
     * Group by CreatorVideoLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorVideoLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorVideoLikeGroupByArgs['orderBy'] }
        : { orderBy?: CreatorVideoLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorVideoLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorVideoLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorVideoLike model
   */
  readonly fields: CreatorVideoLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorVideoLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorVideoLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creatorVideo<T extends CreatorVideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideoDefaultArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreatorVideoLike model
   */
  interface CreatorVideoLikeFieldRefs {
    readonly id: FieldRef<"CreatorVideoLike", 'String'>
    readonly creatorVideoId: FieldRef<"CreatorVideoLike", 'String'>
    readonly likerProfileId: FieldRef<"CreatorVideoLike", 'String'>
    readonly createdAt: FieldRef<"CreatorVideoLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorVideoLike findUnique
   */
  export type CreatorVideoLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoLike to fetch.
     */
    where: CreatorVideoLikeWhereUniqueInput
  }

  /**
   * CreatorVideoLike findUniqueOrThrow
   */
  export type CreatorVideoLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoLike to fetch.
     */
    where: CreatorVideoLikeWhereUniqueInput
  }

  /**
   * CreatorVideoLike findFirst
   */
  export type CreatorVideoLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoLike to fetch.
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoLikes to fetch.
     */
    orderBy?: CreatorVideoLikeOrderByWithRelationInput | CreatorVideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoLikes.
     */
    cursor?: CreatorVideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoLikes.
     */
    distinct?: CreatorVideoLikeScalarFieldEnum | CreatorVideoLikeScalarFieldEnum[]
  }

  /**
   * CreatorVideoLike findFirstOrThrow
   */
  export type CreatorVideoLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoLike to fetch.
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoLikes to fetch.
     */
    orderBy?: CreatorVideoLikeOrderByWithRelationInput | CreatorVideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoLikes.
     */
    cursor?: CreatorVideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoLikes.
     */
    distinct?: CreatorVideoLikeScalarFieldEnum | CreatorVideoLikeScalarFieldEnum[]
  }

  /**
   * CreatorVideoLike findMany
   */
  export type CreatorVideoLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoLikes to fetch.
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoLikes to fetch.
     */
    orderBy?: CreatorVideoLikeOrderByWithRelationInput | CreatorVideoLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorVideoLikes.
     */
    cursor?: CreatorVideoLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoLikes.
     */
    distinct?: CreatorVideoLikeScalarFieldEnum | CreatorVideoLikeScalarFieldEnum[]
  }

  /**
   * CreatorVideoLike create
   */
  export type CreatorVideoLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorVideoLike.
     */
    data: XOR<CreatorVideoLikeCreateInput, CreatorVideoLikeUncheckedCreateInput>
  }

  /**
   * CreatorVideoLike createMany
   */
  export type CreatorVideoLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorVideoLikes.
     */
    data: CreatorVideoLikeCreateManyInput | CreatorVideoLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreatorVideoLike createManyAndReturn
   */
  export type CreatorVideoLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * The data used to create many CreatorVideoLikes.
     */
    data: CreatorVideoLikeCreateManyInput | CreatorVideoLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoLike update
   */
  export type CreatorVideoLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorVideoLike.
     */
    data: XOR<CreatorVideoLikeUpdateInput, CreatorVideoLikeUncheckedUpdateInput>
    /**
     * Choose, which CreatorVideoLike to update.
     */
    where: CreatorVideoLikeWhereUniqueInput
  }

  /**
   * CreatorVideoLike updateMany
   */
  export type CreatorVideoLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorVideoLikes.
     */
    data: XOR<CreatorVideoLikeUpdateManyMutationInput, CreatorVideoLikeUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoLikes to update
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * Limit how many CreatorVideoLikes to update.
     */
    limit?: number
  }

  /**
   * CreatorVideoLike updateManyAndReturn
   */
  export type CreatorVideoLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * The data used to update CreatorVideoLikes.
     */
    data: XOR<CreatorVideoLikeUpdateManyMutationInput, CreatorVideoLikeUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoLikes to update
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * Limit how many CreatorVideoLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoLike upsert
   */
  export type CreatorVideoLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorVideoLike to update in case it exists.
     */
    where: CreatorVideoLikeWhereUniqueInput
    /**
     * In case the CreatorVideoLike found by the `where` argument doesn't exist, create a new CreatorVideoLike with this data.
     */
    create: XOR<CreatorVideoLikeCreateInput, CreatorVideoLikeUncheckedCreateInput>
    /**
     * In case the CreatorVideoLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorVideoLikeUpdateInput, CreatorVideoLikeUncheckedUpdateInput>
  }

  /**
   * CreatorVideoLike delete
   */
  export type CreatorVideoLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
    /**
     * Filter which CreatorVideoLike to delete.
     */
    where: CreatorVideoLikeWhereUniqueInput
  }

  /**
   * CreatorVideoLike deleteMany
   */
  export type CreatorVideoLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoLikes to delete
     */
    where?: CreatorVideoLikeWhereInput
    /**
     * Limit how many CreatorVideoLikes to delete.
     */
    limit?: number
  }

  /**
   * CreatorVideoLike without action
   */
  export type CreatorVideoLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoLike
     */
    select?: CreatorVideoLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoLike
     */
    omit?: CreatorVideoLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoLikeInclude<ExtArgs> | null
  }


  /**
   * Model CreatorVideoComment
   */

  export type AggregateCreatorVideoComment = {
    _count: CreatorVideoCommentCountAggregateOutputType | null
    _min: CreatorVideoCommentMinAggregateOutputType | null
    _max: CreatorVideoCommentMaxAggregateOutputType | null
  }

  export type CreatorVideoCommentMinAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    commenterProfileId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CreatorVideoCommentMaxAggregateOutputType = {
    id: string | null
    creatorVideoId: string | null
    commenterProfileId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CreatorVideoCommentCountAggregateOutputType = {
    id: number
    creatorVideoId: number
    commenterProfileId: number
    content: number
    createdAt: number
    _all: number
  }


  export type CreatorVideoCommentMinAggregateInputType = {
    id?: true
    creatorVideoId?: true
    commenterProfileId?: true
    content?: true
    createdAt?: true
  }

  export type CreatorVideoCommentMaxAggregateInputType = {
    id?: true
    creatorVideoId?: true
    commenterProfileId?: true
    content?: true
    createdAt?: true
  }

  export type CreatorVideoCommentCountAggregateInputType = {
    id?: true
    creatorVideoId?: true
    commenterProfileId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CreatorVideoCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoComment to aggregate.
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoComments to fetch.
     */
    orderBy?: CreatorVideoCommentOrderByWithRelationInput | CreatorVideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorVideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorVideoComments
    **/
    _count?: true | CreatorVideoCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorVideoCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorVideoCommentMaxAggregateInputType
  }

  export type GetCreatorVideoCommentAggregateType<T extends CreatorVideoCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorVideoComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorVideoComment[P]>
      : GetScalarType<T[P], AggregateCreatorVideoComment[P]>
  }




  export type CreatorVideoCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorVideoCommentWhereInput
    orderBy?: CreatorVideoCommentOrderByWithAggregationInput | CreatorVideoCommentOrderByWithAggregationInput[]
    by: CreatorVideoCommentScalarFieldEnum[] | CreatorVideoCommentScalarFieldEnum
    having?: CreatorVideoCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorVideoCommentCountAggregateInputType | true
    _min?: CreatorVideoCommentMinAggregateInputType
    _max?: CreatorVideoCommentMaxAggregateInputType
  }

  export type CreatorVideoCommentGroupByOutputType = {
    id: string
    creatorVideoId: string
    commenterProfileId: string | null
    content: string
    createdAt: Date
    _count: CreatorVideoCommentCountAggregateOutputType | null
    _min: CreatorVideoCommentMinAggregateOutputType | null
    _max: CreatorVideoCommentMaxAggregateOutputType | null
  }

  type GetCreatorVideoCommentGroupByPayload<T extends CreatorVideoCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorVideoCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorVideoCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorVideoCommentGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorVideoCommentGroupByOutputType[P]>
        }
      >
    >


  export type CreatorVideoCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    commenterProfileId?: boolean
    content?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoComment"]>

  export type CreatorVideoCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    commenterProfileId?: boolean
    content?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoComment"]>

  export type CreatorVideoCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorVideoId?: boolean
    commenterProfileId?: boolean
    content?: boolean
    createdAt?: boolean
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorVideoComment"]>

  export type CreatorVideoCommentSelectScalar = {
    id?: boolean
    creatorVideoId?: boolean
    commenterProfileId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CreatorVideoCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorVideoId" | "commenterProfileId" | "content" | "createdAt", ExtArgs["result"]["creatorVideoComment"]>
  export type CreatorVideoCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }
  export type CreatorVideoCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorVideo?: boolean | CreatorVideoDefaultArgs<ExtArgs>
  }

  export type $CreatorVideoCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorVideoComment"
    objects: {
      creatorVideo: Prisma.$CreatorVideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorVideoId: string
      commenterProfileId: string | null
      content: string
      createdAt: Date
    }, ExtArgs["result"]["creatorVideoComment"]>
    composites: {}
  }

  type CreatorVideoCommentGetPayload<S extends boolean | null | undefined | CreatorVideoCommentDefaultArgs> = $Result.GetResult<Prisma.$CreatorVideoCommentPayload, S>

  type CreatorVideoCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorVideoCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorVideoCommentCountAggregateInputType | true
    }

  export interface CreatorVideoCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorVideoComment'], meta: { name: 'CreatorVideoComment' } }
    /**
     * Find zero or one CreatorVideoComment that matches the filter.
     * @param {CreatorVideoCommentFindUniqueArgs} args - Arguments to find a CreatorVideoComment
     * @example
     * // Get one CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorVideoCommentFindUniqueArgs>(args: SelectSubset<T, CreatorVideoCommentFindUniqueArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorVideoComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorVideoCommentFindUniqueOrThrowArgs} args - Arguments to find a CreatorVideoComment
     * @example
     * // Get one CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorVideoCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorVideoCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentFindFirstArgs} args - Arguments to find a CreatorVideoComment
     * @example
     * // Get one CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorVideoCommentFindFirstArgs>(args?: SelectSubset<T, CreatorVideoCommentFindFirstArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorVideoComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentFindFirstOrThrowArgs} args - Arguments to find a CreatorVideoComment
     * @example
     * // Get one CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorVideoCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorVideoCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorVideoComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorVideoComments
     * const creatorVideoComments = await prisma.creatorVideoComment.findMany()
     * 
     * // Get first 10 CreatorVideoComments
     * const creatorVideoComments = await prisma.creatorVideoComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorVideoCommentWithIdOnly = await prisma.creatorVideoComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorVideoCommentFindManyArgs>(args?: SelectSubset<T, CreatorVideoCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorVideoComment.
     * @param {CreatorVideoCommentCreateArgs} args - Arguments to create a CreatorVideoComment.
     * @example
     * // Create one CreatorVideoComment
     * const CreatorVideoComment = await prisma.creatorVideoComment.create({
     *   data: {
     *     // ... data to create a CreatorVideoComment
     *   }
     * })
     * 
     */
    create<T extends CreatorVideoCommentCreateArgs>(args: SelectSubset<T, CreatorVideoCommentCreateArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorVideoComments.
     * @param {CreatorVideoCommentCreateManyArgs} args - Arguments to create many CreatorVideoComments.
     * @example
     * // Create many CreatorVideoComments
     * const creatorVideoComment = await prisma.creatorVideoComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorVideoCommentCreateManyArgs>(args?: SelectSubset<T, CreatorVideoCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreatorVideoComments and returns the data saved in the database.
     * @param {CreatorVideoCommentCreateManyAndReturnArgs} args - Arguments to create many CreatorVideoComments.
     * @example
     * // Create many CreatorVideoComments
     * const creatorVideoComment = await prisma.creatorVideoComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreatorVideoComments and only return the `id`
     * const creatorVideoCommentWithIdOnly = await prisma.creatorVideoComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreatorVideoCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CreatorVideoCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreatorVideoComment.
     * @param {CreatorVideoCommentDeleteArgs} args - Arguments to delete one CreatorVideoComment.
     * @example
     * // Delete one CreatorVideoComment
     * const CreatorVideoComment = await prisma.creatorVideoComment.delete({
     *   where: {
     *     // ... filter to delete one CreatorVideoComment
     *   }
     * })
     * 
     */
    delete<T extends CreatorVideoCommentDeleteArgs>(args: SelectSubset<T, CreatorVideoCommentDeleteArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorVideoComment.
     * @param {CreatorVideoCommentUpdateArgs} args - Arguments to update one CreatorVideoComment.
     * @example
     * // Update one CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorVideoCommentUpdateArgs>(args: SelectSubset<T, CreatorVideoCommentUpdateArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorVideoComments.
     * @param {CreatorVideoCommentDeleteManyArgs} args - Arguments to filter CreatorVideoComments to delete.
     * @example
     * // Delete a few CreatorVideoComments
     * const { count } = await prisma.creatorVideoComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorVideoCommentDeleteManyArgs>(args?: SelectSubset<T, CreatorVideoCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorVideoComments
     * const creatorVideoComment = await prisma.creatorVideoComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorVideoCommentUpdateManyArgs>(args: SelectSubset<T, CreatorVideoCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorVideoComments and returns the data updated in the database.
     * @param {CreatorVideoCommentUpdateManyAndReturnArgs} args - Arguments to update many CreatorVideoComments.
     * @example
     * // Update many CreatorVideoComments
     * const creatorVideoComment = await prisma.creatorVideoComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreatorVideoComments and only return the `id`
     * const creatorVideoCommentWithIdOnly = await prisma.creatorVideoComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreatorVideoCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CreatorVideoCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreatorVideoComment.
     * @param {CreatorVideoCommentUpsertArgs} args - Arguments to update or create a CreatorVideoComment.
     * @example
     * // Update or create a CreatorVideoComment
     * const creatorVideoComment = await prisma.creatorVideoComment.upsert({
     *   create: {
     *     // ... data to create a CreatorVideoComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorVideoComment we want to update
     *   }
     * })
     */
    upsert<T extends CreatorVideoCommentUpsertArgs>(args: SelectSubset<T, CreatorVideoCommentUpsertArgs<ExtArgs>>): Prisma__CreatorVideoCommentClient<$Result.GetResult<Prisma.$CreatorVideoCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreatorVideoComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentCountArgs} args - Arguments to filter CreatorVideoComments to count.
     * @example
     * // Count the number of CreatorVideoComments
     * const count = await prisma.creatorVideoComment.count({
     *   where: {
     *     // ... the filter for the CreatorVideoComments we want to count
     *   }
     * })
    **/
    count<T extends CreatorVideoCommentCountArgs>(
      args?: Subset<T, CreatorVideoCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorVideoCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorVideoComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorVideoCommentAggregateArgs>(args: Subset<T, CreatorVideoCommentAggregateArgs>): Prisma.PrismaPromise<GetCreatorVideoCommentAggregateType<T>>

    /**
     * Group by CreatorVideoComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorVideoCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorVideoCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorVideoCommentGroupByArgs['orderBy'] }
        : { orderBy?: CreatorVideoCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorVideoCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorVideoCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorVideoComment model
   */
  readonly fields: CreatorVideoCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorVideoComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorVideoCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creatorVideo<T extends CreatorVideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreatorVideoDefaultArgs<ExtArgs>>): Prisma__CreatorVideoClient<$Result.GetResult<Prisma.$CreatorVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreatorVideoComment model
   */
  interface CreatorVideoCommentFieldRefs {
    readonly id: FieldRef<"CreatorVideoComment", 'String'>
    readonly creatorVideoId: FieldRef<"CreatorVideoComment", 'String'>
    readonly commenterProfileId: FieldRef<"CreatorVideoComment", 'String'>
    readonly content: FieldRef<"CreatorVideoComment", 'String'>
    readonly createdAt: FieldRef<"CreatorVideoComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorVideoComment findUnique
   */
  export type CreatorVideoCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoComment to fetch.
     */
    where: CreatorVideoCommentWhereUniqueInput
  }

  /**
   * CreatorVideoComment findUniqueOrThrow
   */
  export type CreatorVideoCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoComment to fetch.
     */
    where: CreatorVideoCommentWhereUniqueInput
  }

  /**
   * CreatorVideoComment findFirst
   */
  export type CreatorVideoCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoComment to fetch.
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoComments to fetch.
     */
    orderBy?: CreatorVideoCommentOrderByWithRelationInput | CreatorVideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoComments.
     */
    cursor?: CreatorVideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoComments.
     */
    distinct?: CreatorVideoCommentScalarFieldEnum | CreatorVideoCommentScalarFieldEnum[]
  }

  /**
   * CreatorVideoComment findFirstOrThrow
   */
  export type CreatorVideoCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoComment to fetch.
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoComments to fetch.
     */
    orderBy?: CreatorVideoCommentOrderByWithRelationInput | CreatorVideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorVideoComments.
     */
    cursor?: CreatorVideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoComments.
     */
    distinct?: CreatorVideoCommentScalarFieldEnum | CreatorVideoCommentScalarFieldEnum[]
  }

  /**
   * CreatorVideoComment findMany
   */
  export type CreatorVideoCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter, which CreatorVideoComments to fetch.
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorVideoComments to fetch.
     */
    orderBy?: CreatorVideoCommentOrderByWithRelationInput | CreatorVideoCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorVideoComments.
     */
    cursor?: CreatorVideoCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorVideoComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorVideoComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorVideoComments.
     */
    distinct?: CreatorVideoCommentScalarFieldEnum | CreatorVideoCommentScalarFieldEnum[]
  }

  /**
   * CreatorVideoComment create
   */
  export type CreatorVideoCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorVideoComment.
     */
    data: XOR<CreatorVideoCommentCreateInput, CreatorVideoCommentUncheckedCreateInput>
  }

  /**
   * CreatorVideoComment createMany
   */
  export type CreatorVideoCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorVideoComments.
     */
    data: CreatorVideoCommentCreateManyInput | CreatorVideoCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreatorVideoComment createManyAndReturn
   */
  export type CreatorVideoCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * The data used to create many CreatorVideoComments.
     */
    data: CreatorVideoCommentCreateManyInput | CreatorVideoCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoComment update
   */
  export type CreatorVideoCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorVideoComment.
     */
    data: XOR<CreatorVideoCommentUpdateInput, CreatorVideoCommentUncheckedUpdateInput>
    /**
     * Choose, which CreatorVideoComment to update.
     */
    where: CreatorVideoCommentWhereUniqueInput
  }

  /**
   * CreatorVideoComment updateMany
   */
  export type CreatorVideoCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorVideoComments.
     */
    data: XOR<CreatorVideoCommentUpdateManyMutationInput, CreatorVideoCommentUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoComments to update
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * Limit how many CreatorVideoComments to update.
     */
    limit?: number
  }

  /**
   * CreatorVideoComment updateManyAndReturn
   */
  export type CreatorVideoCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * The data used to update CreatorVideoComments.
     */
    data: XOR<CreatorVideoCommentUpdateManyMutationInput, CreatorVideoCommentUncheckedUpdateManyInput>
    /**
     * Filter which CreatorVideoComments to update
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * Limit how many CreatorVideoComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreatorVideoComment upsert
   */
  export type CreatorVideoCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorVideoComment to update in case it exists.
     */
    where: CreatorVideoCommentWhereUniqueInput
    /**
     * In case the CreatorVideoComment found by the `where` argument doesn't exist, create a new CreatorVideoComment with this data.
     */
    create: XOR<CreatorVideoCommentCreateInput, CreatorVideoCommentUncheckedCreateInput>
    /**
     * In case the CreatorVideoComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorVideoCommentUpdateInput, CreatorVideoCommentUncheckedUpdateInput>
  }

  /**
   * CreatorVideoComment delete
   */
  export type CreatorVideoCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
    /**
     * Filter which CreatorVideoComment to delete.
     */
    where: CreatorVideoCommentWhereUniqueInput
  }

  /**
   * CreatorVideoComment deleteMany
   */
  export type CreatorVideoCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorVideoComments to delete
     */
    where?: CreatorVideoCommentWhereInput
    /**
     * Limit how many CreatorVideoComments to delete.
     */
    limit?: number
  }

  /**
   * CreatorVideoComment without action
   */
  export type CreatorVideoCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorVideoComment
     */
    select?: CreatorVideoCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorVideoComment
     */
    omit?: CreatorVideoCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorVideoCommentInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    fullName: 'fullName',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    addressFull: 'addressFull',
    addressLat: 'addressLat',
    addressLon: 'addressLon',
    addressType: 'addressType',
    addressCountry: 'addressCountry',
    addressState: 'addressState',
    addressName: 'addressName',
    age: 'age',
    sex: 'sex',
    emailVerified: 'emailVerified',
    hasPassword: 'hasPassword',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const SuperAdminSettingScalarFieldEnum: {
    id: 'id',
    section: 'section',
    platformFeePercentage: 'platformFeePercentage',
    enterpriseFeePercentage: 'enterpriseFeePercentage',
    minimumPayoutAmount: 'minimumPayoutAmount',
    payoutProcessingDays: 'payoutProcessingDays',
    companyName: 'companyName',
    companyEmail: 'companyEmail',
    supportEmail: 'supportEmail',
    companyPhone: 'companyPhone',
    companyAddress: 'companyAddress',
    companyWebsite: 'companyWebsite',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SuperAdminSettingScalarFieldEnum = (typeof SuperAdminSettingScalarFieldEnum)[keyof typeof SuperAdminSettingScalarFieldEnum]


  export const AuthCredentialScalarFieldEnum: {
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthCredentialScalarFieldEnum = (typeof AuthCredentialScalarFieldEnum)[keyof typeof AuthCredentialScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CreatorScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreatorScalarFieldEnum = (typeof CreatorScalarFieldEnum)[keyof typeof CreatorScalarFieldEnum]


  export const CreatorVideoFolderScalarFieldEnum: {
    id: 'id',
    creatorId: 'creatorId',
    title: 'title',
    folderType: 'folderType',
    status: 'status',
    thumbnailUrl: 'thumbnailUrl',
    thumbnailFileId: 'thumbnailFileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreatorVideoFolderScalarFieldEnum = (typeof CreatorVideoFolderScalarFieldEnum)[keyof typeof CreatorVideoFolderScalarFieldEnum]


  export const CreatorVideoScalarFieldEnum: {
    id: 'id',
    creatorId: 'creatorId',
    folderId: 'folderId',
    title: 'title',
    description: 'description',
    category: 'category',
    videoUrl: 'videoUrl',
    videoFileId: 'videoFileId',
    thumbnailUrl: 'thumbnailUrl',
    thumbnailFileId: 'thumbnailFileId',
    isPrivate: 'isPrivate',
    isPremium: 'isPremium',
    monetizationType: 'monetizationType',
    status: 'status',
    publishNow: 'publishNow',
    scheduledAt: 'scheduledAt',
    rent24Price: 'rent24Price',
    rent48Price: 'rent48Price',
    purchasePrice: 'purchasePrice',
    tags: 'tags',
    packageName: 'packageName',
    episodeIndex: 'episodeIndex',
    duration: 'duration',
    allowComments: 'allowComments',
    ageRestriction: 'ageRestriction',
    viewsCount: 'viewsCount',
    likesCount: 'likesCount',
    commentsCount: 'commentsCount',
    revenue: 'revenue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreatorVideoScalarFieldEnum = (typeof CreatorVideoScalarFieldEnum)[keyof typeof CreatorVideoScalarFieldEnum]


  export const CreatorVideoViewScalarFieldEnum: {
    id: 'id',
    creatorVideoId: 'creatorVideoId',
    viewerProfileId: 'viewerProfileId',
    createdAt: 'createdAt'
  };

  export type CreatorVideoViewScalarFieldEnum = (typeof CreatorVideoViewScalarFieldEnum)[keyof typeof CreatorVideoViewScalarFieldEnum]


  export const CreatorVideoLikeScalarFieldEnum: {
    id: 'id',
    creatorVideoId: 'creatorVideoId',
    likerProfileId: 'likerProfileId',
    createdAt: 'createdAt'
  };

  export type CreatorVideoLikeScalarFieldEnum = (typeof CreatorVideoLikeScalarFieldEnum)[keyof typeof CreatorVideoLikeScalarFieldEnum]


  export const CreatorVideoCommentScalarFieldEnum: {
    id: 'id',
    creatorVideoId: 'creatorVideoId',
    commenterProfileId: 'commenterProfileId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CreatorVideoCommentScalarFieldEnum = (typeof CreatorVideoCommentScalarFieldEnum)[keyof typeof CreatorVideoCommentScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SuperAdminSettingSection'
   */
  export type EnumSuperAdminSettingSectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuperAdminSettingSection'>
    


  /**
   * Reference to a field of type 'SuperAdminSettingSection[]'
   */
  export type ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuperAdminSettingSection[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    fullName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    addressFull?: StringNullableFilter<"Profile"> | string | null
    addressLat?: FloatNullableFilter<"Profile"> | number | null
    addressLon?: FloatNullableFilter<"Profile"> | number | null
    addressType?: StringNullableFilter<"Profile"> | string | null
    addressCountry?: StringNullableFilter<"Profile"> | string | null
    addressState?: StringNullableFilter<"Profile"> | string | null
    addressName?: StringNullableFilter<"Profile"> | string | null
    age?: IntNullableFilter<"Profile"> | number | null
    sex?: StringNullableFilter<"Profile"> | string | null
    emailVerified?: BoolFilter<"Profile"> | boolean
    hasPassword?: BoolFilter<"Profile"> | boolean
    lastLogin?: DateTimeNullableFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    creator?: XOR<CreatorNullableScalarRelationFilter, CreatorWhereInput> | null
    credential?: XOR<AuthCredentialNullableScalarRelationFilter, AuthCredentialWhereInput> | null
    session?: SessionListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    fullName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    addressFull?: SortOrderInput | SortOrder
    addressLat?: SortOrderInput | SortOrder
    addressLon?: SortOrderInput | SortOrder
    addressType?: SortOrderInput | SortOrder
    addressCountry?: SortOrderInput | SortOrder
    addressState?: SortOrderInput | SortOrder
    addressName?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    hasPassword?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: CreatorOrderByWithRelationInput
    credential?: AuthCredentialOrderByWithRelationInput
    session?: SessionOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    fullName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    addressFull?: StringNullableFilter<"Profile"> | string | null
    addressLat?: FloatNullableFilter<"Profile"> | number | null
    addressLon?: FloatNullableFilter<"Profile"> | number | null
    addressType?: StringNullableFilter<"Profile"> | string | null
    addressCountry?: StringNullableFilter<"Profile"> | string | null
    addressState?: StringNullableFilter<"Profile"> | string | null
    addressName?: StringNullableFilter<"Profile"> | string | null
    age?: IntNullableFilter<"Profile"> | number | null
    sex?: StringNullableFilter<"Profile"> | string | null
    emailVerified?: BoolFilter<"Profile"> | boolean
    hasPassword?: BoolFilter<"Profile"> | boolean
    lastLogin?: DateTimeNullableFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    creator?: XOR<CreatorNullableScalarRelationFilter, CreatorWhereInput> | null
    credential?: XOR<AuthCredentialNullableScalarRelationFilter, AuthCredentialWhereInput> | null
    session?: SessionListRelationFilter
  }, "id" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    fullName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    addressFull?: SortOrderInput | SortOrder
    addressLat?: SortOrderInput | SortOrder
    addressLon?: SortOrderInput | SortOrder
    addressType?: SortOrderInput | SortOrder
    addressCountry?: SortOrderInput | SortOrder
    addressState?: SortOrderInput | SortOrder
    addressName?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    hasPassword?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    role?: EnumRoleWithAggregatesFilter<"Profile"> | $Enums.Role
    fullName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    addressFull?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    addressLat?: FloatNullableWithAggregatesFilter<"Profile"> | number | null
    addressLon?: FloatNullableWithAggregatesFilter<"Profile"> | number | null
    addressType?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    addressCountry?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    addressState?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    addressName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    age?: IntNullableWithAggregatesFilter<"Profile"> | number | null
    sex?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"Profile"> | boolean
    hasPassword?: BoolWithAggregatesFilter<"Profile"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type SuperAdminSettingWhereInput = {
    AND?: SuperAdminSettingWhereInput | SuperAdminSettingWhereInput[]
    OR?: SuperAdminSettingWhereInput[]
    NOT?: SuperAdminSettingWhereInput | SuperAdminSettingWhereInput[]
    id?: StringFilter<"SuperAdminSetting"> | string
    section?: EnumSuperAdminSettingSectionFilter<"SuperAdminSetting"> | $Enums.SuperAdminSettingSection
    platformFeePercentage?: IntNullableFilter<"SuperAdminSetting"> | number | null
    enterpriseFeePercentage?: IntNullableFilter<"SuperAdminSetting"> | number | null
    minimumPayoutAmount?: IntNullableFilter<"SuperAdminSetting"> | number | null
    payoutProcessingDays?: IntNullableFilter<"SuperAdminSetting"> | number | null
    companyName?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyEmail?: StringNullableFilter<"SuperAdminSetting"> | string | null
    supportEmail?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyPhone?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyAddress?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyWebsite?: StringNullableFilter<"SuperAdminSetting"> | string | null
    createdBy?: StringNullableFilter<"SuperAdminSetting"> | string | null
    updatedBy?: StringNullableFilter<"SuperAdminSetting"> | string | null
    createdAt?: DateTimeFilter<"SuperAdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SuperAdminSetting"> | Date | string
  }

  export type SuperAdminSettingOrderByWithRelationInput = {
    id?: SortOrder
    section?: SortOrder
    platformFeePercentage?: SortOrderInput | SortOrder
    enterpriseFeePercentage?: SortOrderInput | SortOrder
    minimumPayoutAmount?: SortOrderInput | SortOrder
    payoutProcessingDays?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    companyEmail?: SortOrderInput | SortOrder
    supportEmail?: SortOrderInput | SortOrder
    companyPhone?: SortOrderInput | SortOrder
    companyAddress?: SortOrderInput | SortOrder
    companyWebsite?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    section?: $Enums.SuperAdminSettingSection
    AND?: SuperAdminSettingWhereInput | SuperAdminSettingWhereInput[]
    OR?: SuperAdminSettingWhereInput[]
    NOT?: SuperAdminSettingWhereInput | SuperAdminSettingWhereInput[]
    platformFeePercentage?: IntNullableFilter<"SuperAdminSetting"> | number | null
    enterpriseFeePercentage?: IntNullableFilter<"SuperAdminSetting"> | number | null
    minimumPayoutAmount?: IntNullableFilter<"SuperAdminSetting"> | number | null
    payoutProcessingDays?: IntNullableFilter<"SuperAdminSetting"> | number | null
    companyName?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyEmail?: StringNullableFilter<"SuperAdminSetting"> | string | null
    supportEmail?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyPhone?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyAddress?: StringNullableFilter<"SuperAdminSetting"> | string | null
    companyWebsite?: StringNullableFilter<"SuperAdminSetting"> | string | null
    createdBy?: StringNullableFilter<"SuperAdminSetting"> | string | null
    updatedBy?: StringNullableFilter<"SuperAdminSetting"> | string | null
    createdAt?: DateTimeFilter<"SuperAdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SuperAdminSetting"> | Date | string
  }, "id" | "section">

  export type SuperAdminSettingOrderByWithAggregationInput = {
    id?: SortOrder
    section?: SortOrder
    platformFeePercentage?: SortOrderInput | SortOrder
    enterpriseFeePercentage?: SortOrderInput | SortOrder
    minimumPayoutAmount?: SortOrderInput | SortOrder
    payoutProcessingDays?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    companyEmail?: SortOrderInput | SortOrder
    supportEmail?: SortOrderInput | SortOrder
    companyPhone?: SortOrderInput | SortOrder
    companyAddress?: SortOrderInput | SortOrder
    companyWebsite?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SuperAdminSettingCountOrderByAggregateInput
    _avg?: SuperAdminSettingAvgOrderByAggregateInput
    _max?: SuperAdminSettingMaxOrderByAggregateInput
    _min?: SuperAdminSettingMinOrderByAggregateInput
    _sum?: SuperAdminSettingSumOrderByAggregateInput
  }

  export type SuperAdminSettingScalarWhereWithAggregatesInput = {
    AND?: SuperAdminSettingScalarWhereWithAggregatesInput | SuperAdminSettingScalarWhereWithAggregatesInput[]
    OR?: SuperAdminSettingScalarWhereWithAggregatesInput[]
    NOT?: SuperAdminSettingScalarWhereWithAggregatesInput | SuperAdminSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SuperAdminSetting"> | string
    section?: EnumSuperAdminSettingSectionWithAggregatesFilter<"SuperAdminSetting"> | $Enums.SuperAdminSettingSection
    platformFeePercentage?: IntNullableWithAggregatesFilter<"SuperAdminSetting"> | number | null
    enterpriseFeePercentage?: IntNullableWithAggregatesFilter<"SuperAdminSetting"> | number | null
    minimumPayoutAmount?: IntNullableWithAggregatesFilter<"SuperAdminSetting"> | number | null
    payoutProcessingDays?: IntNullableWithAggregatesFilter<"SuperAdminSetting"> | number | null
    companyName?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    companyEmail?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    supportEmail?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    companyPhone?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    companyAddress?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    companyWebsite?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"SuperAdminSetting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SuperAdminSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SuperAdminSetting"> | Date | string
  }

  export type AuthCredentialWhereInput = {
    AND?: AuthCredentialWhereInput | AuthCredentialWhereInput[]
    OR?: AuthCredentialWhereInput[]
    NOT?: AuthCredentialWhereInput | AuthCredentialWhereInput[]
    email?: StringFilter<"AuthCredential"> | string
    passwordHash?: StringFilter<"AuthCredential"> | string
    createdAt?: DateTimeFilter<"AuthCredential"> | Date | string
    updatedAt?: DateTimeFilter<"AuthCredential"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type AuthCredentialOrderByWithRelationInput = {
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type AuthCredentialWhereUniqueInput = Prisma.AtLeast<{
    email?: string
    AND?: AuthCredentialWhereInput | AuthCredentialWhereInput[]
    OR?: AuthCredentialWhereInput[]
    NOT?: AuthCredentialWhereInput | AuthCredentialWhereInput[]
    passwordHash?: StringFilter<"AuthCredential"> | string
    createdAt?: DateTimeFilter<"AuthCredential"> | Date | string
    updatedAt?: DateTimeFilter<"AuthCredential"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "email">

  export type AuthCredentialOrderByWithAggregationInput = {
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthCredentialCountOrderByAggregateInput
    _max?: AuthCredentialMaxOrderByAggregateInput
    _min?: AuthCredentialMinOrderByAggregateInput
  }

  export type AuthCredentialScalarWhereWithAggregatesInput = {
    AND?: AuthCredentialScalarWhereWithAggregatesInput | AuthCredentialScalarWhereWithAggregatesInput[]
    OR?: AuthCredentialScalarWhereWithAggregatesInput[]
    NOT?: AuthCredentialScalarWhereWithAggregatesInput | AuthCredentialScalarWhereWithAggregatesInput[]
    email?: StringWithAggregatesFilter<"AuthCredential"> | string
    passwordHash?: StringWithAggregatesFilter<"AuthCredential"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuthCredential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AuthCredential"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type CreatorWhereInput = {
    AND?: CreatorWhereInput | CreatorWhereInput[]
    OR?: CreatorWhereInput[]
    NOT?: CreatorWhereInput | CreatorWhereInput[]
    id?: StringFilter<"Creator"> | string
    profileId?: StringFilter<"Creator"> | string
    createdAt?: DateTimeFilter<"Creator"> | Date | string
    updatedAt?: DateTimeFilter<"Creator"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    videos?: CreatorVideoListRelationFilter
    folders?: CreatorVideoFolderListRelationFilter
  }

  export type CreatorOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    videos?: CreatorVideoOrderByRelationAggregateInput
    folders?: CreatorVideoFolderOrderByRelationAggregateInput
  }

  export type CreatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profileId?: string
    AND?: CreatorWhereInput | CreatorWhereInput[]
    OR?: CreatorWhereInput[]
    NOT?: CreatorWhereInput | CreatorWhereInput[]
    createdAt?: DateTimeFilter<"Creator"> | Date | string
    updatedAt?: DateTimeFilter<"Creator"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    videos?: CreatorVideoListRelationFilter
    folders?: CreatorVideoFolderListRelationFilter
  }, "id" | "profileId">

  export type CreatorOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreatorCountOrderByAggregateInput
    _max?: CreatorMaxOrderByAggregateInput
    _min?: CreatorMinOrderByAggregateInput
  }

  export type CreatorScalarWhereWithAggregatesInput = {
    AND?: CreatorScalarWhereWithAggregatesInput | CreatorScalarWhereWithAggregatesInput[]
    OR?: CreatorScalarWhereWithAggregatesInput[]
    NOT?: CreatorScalarWhereWithAggregatesInput | CreatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Creator"> | string
    profileId?: StringWithAggregatesFilter<"Creator"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Creator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Creator"> | Date | string
  }

  export type CreatorVideoFolderWhereInput = {
    AND?: CreatorVideoFolderWhereInput | CreatorVideoFolderWhereInput[]
    OR?: CreatorVideoFolderWhereInput[]
    NOT?: CreatorVideoFolderWhereInput | CreatorVideoFolderWhereInput[]
    id?: StringFilter<"CreatorVideoFolder"> | string
    creatorId?: StringFilter<"CreatorVideoFolder"> | string
    title?: StringFilter<"CreatorVideoFolder"> | string
    folderType?: StringFilter<"CreatorVideoFolder"> | string
    status?: StringFilter<"CreatorVideoFolder"> | string
    thumbnailUrl?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
    creator?: XOR<CreatorScalarRelationFilter, CreatorWhereInput>
    videos?: CreatorVideoListRelationFilter
  }

  export type CreatorVideoFolderOrderByWithRelationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    folderType?: SortOrder
    status?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    thumbnailFileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: CreatorOrderByWithRelationInput
    videos?: CreatorVideoOrderByRelationAggregateInput
  }

  export type CreatorVideoFolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreatorVideoFolderWhereInput | CreatorVideoFolderWhereInput[]
    OR?: CreatorVideoFolderWhereInput[]
    NOT?: CreatorVideoFolderWhereInput | CreatorVideoFolderWhereInput[]
    creatorId?: StringFilter<"CreatorVideoFolder"> | string
    title?: StringFilter<"CreatorVideoFolder"> | string
    folderType?: StringFilter<"CreatorVideoFolder"> | string
    status?: StringFilter<"CreatorVideoFolder"> | string
    thumbnailUrl?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
    creator?: XOR<CreatorScalarRelationFilter, CreatorWhereInput>
    videos?: CreatorVideoListRelationFilter
  }, "id">

  export type CreatorVideoFolderOrderByWithAggregationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    folderType?: SortOrder
    status?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    thumbnailFileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreatorVideoFolderCountOrderByAggregateInput
    _max?: CreatorVideoFolderMaxOrderByAggregateInput
    _min?: CreatorVideoFolderMinOrderByAggregateInput
  }

  export type CreatorVideoFolderScalarWhereWithAggregatesInput = {
    AND?: CreatorVideoFolderScalarWhereWithAggregatesInput | CreatorVideoFolderScalarWhereWithAggregatesInput[]
    OR?: CreatorVideoFolderScalarWhereWithAggregatesInput[]
    NOT?: CreatorVideoFolderScalarWhereWithAggregatesInput | CreatorVideoFolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorVideoFolder"> | string
    creatorId?: StringWithAggregatesFilter<"CreatorVideoFolder"> | string
    title?: StringWithAggregatesFilter<"CreatorVideoFolder"> | string
    folderType?: StringWithAggregatesFilter<"CreatorVideoFolder"> | string
    status?: StringWithAggregatesFilter<"CreatorVideoFolder"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"CreatorVideoFolder"> | string | null
    thumbnailFileId?: StringNullableWithAggregatesFilter<"CreatorVideoFolder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreatorVideoFolder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreatorVideoFolder"> | Date | string
  }

  export type CreatorVideoWhereInput = {
    AND?: CreatorVideoWhereInput | CreatorVideoWhereInput[]
    OR?: CreatorVideoWhereInput[]
    NOT?: CreatorVideoWhereInput | CreatorVideoWhereInput[]
    id?: StringFilter<"CreatorVideo"> | string
    creatorId?: StringFilter<"CreatorVideo"> | string
    folderId?: StringFilter<"CreatorVideo"> | string
    title?: StringFilter<"CreatorVideo"> | string
    description?: StringNullableFilter<"CreatorVideo"> | string | null
    category?: StringNullableFilter<"CreatorVideo"> | string | null
    videoUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    videoFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    isPrivate?: BoolFilter<"CreatorVideo"> | boolean
    isPremium?: BoolFilter<"CreatorVideo"> | boolean
    monetizationType?: StringFilter<"CreatorVideo"> | string
    status?: StringFilter<"CreatorVideo"> | string
    publishNow?: BoolFilter<"CreatorVideo"> | boolean
    scheduledAt?: DateTimeNullableFilter<"CreatorVideo"> | Date | string | null
    rent24Price?: IntNullableFilter<"CreatorVideo"> | number | null
    rent48Price?: IntNullableFilter<"CreatorVideo"> | number | null
    purchasePrice?: IntNullableFilter<"CreatorVideo"> | number | null
    tags?: StringNullableListFilter<"CreatorVideo">
    packageName?: StringNullableFilter<"CreatorVideo"> | string | null
    episodeIndex?: IntNullableFilter<"CreatorVideo"> | number | null
    duration?: StringNullableFilter<"CreatorVideo"> | string | null
    allowComments?: BoolFilter<"CreatorVideo"> | boolean
    ageRestriction?: BoolFilter<"CreatorVideo"> | boolean
    viewsCount?: IntFilter<"CreatorVideo"> | number
    likesCount?: IntFilter<"CreatorVideo"> | number
    commentsCount?: IntFilter<"CreatorVideo"> | number
    revenue?: IntFilter<"CreatorVideo"> | number
    createdAt?: DateTimeFilter<"CreatorVideo"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideo"> | Date | string
    creator?: XOR<CreatorScalarRelationFilter, CreatorWhereInput>
    folder?: XOR<CreatorVideoFolderScalarRelationFilter, CreatorVideoFolderWhereInput>
    views?: CreatorVideoViewListRelationFilter
    likes?: CreatorVideoLikeListRelationFilter
    comments?: CreatorVideoCommentListRelationFilter
  }

  export type CreatorVideoOrderByWithRelationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    folderId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    videoFileId?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    thumbnailFileId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    isPremium?: SortOrder
    monetizationType?: SortOrder
    status?: SortOrder
    publishNow?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    rent24Price?: SortOrderInput | SortOrder
    rent48Price?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    tags?: SortOrder
    packageName?: SortOrderInput | SortOrder
    episodeIndex?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    allowComments?: SortOrder
    ageRestriction?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: CreatorOrderByWithRelationInput
    folder?: CreatorVideoFolderOrderByWithRelationInput
    views?: CreatorVideoViewOrderByRelationAggregateInput
    likes?: CreatorVideoLikeOrderByRelationAggregateInput
    comments?: CreatorVideoCommentOrderByRelationAggregateInput
  }

  export type CreatorVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreatorVideoWhereInput | CreatorVideoWhereInput[]
    OR?: CreatorVideoWhereInput[]
    NOT?: CreatorVideoWhereInput | CreatorVideoWhereInput[]
    creatorId?: StringFilter<"CreatorVideo"> | string
    folderId?: StringFilter<"CreatorVideo"> | string
    title?: StringFilter<"CreatorVideo"> | string
    description?: StringNullableFilter<"CreatorVideo"> | string | null
    category?: StringNullableFilter<"CreatorVideo"> | string | null
    videoUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    videoFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    isPrivate?: BoolFilter<"CreatorVideo"> | boolean
    isPremium?: BoolFilter<"CreatorVideo"> | boolean
    monetizationType?: StringFilter<"CreatorVideo"> | string
    status?: StringFilter<"CreatorVideo"> | string
    publishNow?: BoolFilter<"CreatorVideo"> | boolean
    scheduledAt?: DateTimeNullableFilter<"CreatorVideo"> | Date | string | null
    rent24Price?: IntNullableFilter<"CreatorVideo"> | number | null
    rent48Price?: IntNullableFilter<"CreatorVideo"> | number | null
    purchasePrice?: IntNullableFilter<"CreatorVideo"> | number | null
    tags?: StringNullableListFilter<"CreatorVideo">
    packageName?: StringNullableFilter<"CreatorVideo"> | string | null
    episodeIndex?: IntNullableFilter<"CreatorVideo"> | number | null
    duration?: StringNullableFilter<"CreatorVideo"> | string | null
    allowComments?: BoolFilter<"CreatorVideo"> | boolean
    ageRestriction?: BoolFilter<"CreatorVideo"> | boolean
    viewsCount?: IntFilter<"CreatorVideo"> | number
    likesCount?: IntFilter<"CreatorVideo"> | number
    commentsCount?: IntFilter<"CreatorVideo"> | number
    revenue?: IntFilter<"CreatorVideo"> | number
    createdAt?: DateTimeFilter<"CreatorVideo"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideo"> | Date | string
    creator?: XOR<CreatorScalarRelationFilter, CreatorWhereInput>
    folder?: XOR<CreatorVideoFolderScalarRelationFilter, CreatorVideoFolderWhereInput>
    views?: CreatorVideoViewListRelationFilter
    likes?: CreatorVideoLikeListRelationFilter
    comments?: CreatorVideoCommentListRelationFilter
  }, "id">

  export type CreatorVideoOrderByWithAggregationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    folderId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    videoFileId?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    thumbnailFileId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    isPremium?: SortOrder
    monetizationType?: SortOrder
    status?: SortOrder
    publishNow?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    rent24Price?: SortOrderInput | SortOrder
    rent48Price?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    tags?: SortOrder
    packageName?: SortOrderInput | SortOrder
    episodeIndex?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    allowComments?: SortOrder
    ageRestriction?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreatorVideoCountOrderByAggregateInput
    _avg?: CreatorVideoAvgOrderByAggregateInput
    _max?: CreatorVideoMaxOrderByAggregateInput
    _min?: CreatorVideoMinOrderByAggregateInput
    _sum?: CreatorVideoSumOrderByAggregateInput
  }

  export type CreatorVideoScalarWhereWithAggregatesInput = {
    AND?: CreatorVideoScalarWhereWithAggregatesInput | CreatorVideoScalarWhereWithAggregatesInput[]
    OR?: CreatorVideoScalarWhereWithAggregatesInput[]
    NOT?: CreatorVideoScalarWhereWithAggregatesInput | CreatorVideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorVideo"> | string
    creatorId?: StringWithAggregatesFilter<"CreatorVideo"> | string
    folderId?: StringWithAggregatesFilter<"CreatorVideo"> | string
    title?: StringWithAggregatesFilter<"CreatorVideo"> | string
    description?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    category?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    videoFileId?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    thumbnailFileId?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"CreatorVideo"> | boolean
    isPremium?: BoolWithAggregatesFilter<"CreatorVideo"> | boolean
    monetizationType?: StringWithAggregatesFilter<"CreatorVideo"> | string
    status?: StringWithAggregatesFilter<"CreatorVideo"> | string
    publishNow?: BoolWithAggregatesFilter<"CreatorVideo"> | boolean
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"CreatorVideo"> | Date | string | null
    rent24Price?: IntNullableWithAggregatesFilter<"CreatorVideo"> | number | null
    rent48Price?: IntNullableWithAggregatesFilter<"CreatorVideo"> | number | null
    purchasePrice?: IntNullableWithAggregatesFilter<"CreatorVideo"> | number | null
    tags?: StringNullableListFilter<"CreatorVideo">
    packageName?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    episodeIndex?: IntNullableWithAggregatesFilter<"CreatorVideo"> | number | null
    duration?: StringNullableWithAggregatesFilter<"CreatorVideo"> | string | null
    allowComments?: BoolWithAggregatesFilter<"CreatorVideo"> | boolean
    ageRestriction?: BoolWithAggregatesFilter<"CreatorVideo"> | boolean
    viewsCount?: IntWithAggregatesFilter<"CreatorVideo"> | number
    likesCount?: IntWithAggregatesFilter<"CreatorVideo"> | number
    commentsCount?: IntWithAggregatesFilter<"CreatorVideo"> | number
    revenue?: IntWithAggregatesFilter<"CreatorVideo"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CreatorVideo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreatorVideo"> | Date | string
  }

  export type CreatorVideoViewWhereInput = {
    AND?: CreatorVideoViewWhereInput | CreatorVideoViewWhereInput[]
    OR?: CreatorVideoViewWhereInput[]
    NOT?: CreatorVideoViewWhereInput | CreatorVideoViewWhereInput[]
    id?: StringFilter<"CreatorVideoView"> | string
    creatorVideoId?: StringFilter<"CreatorVideoView"> | string
    viewerProfileId?: StringNullableFilter<"CreatorVideoView"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoView"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }

  export type CreatorVideoViewOrderByWithRelationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    viewerProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    creatorVideo?: CreatorVideoOrderByWithRelationInput
  }

  export type CreatorVideoViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreatorVideoViewWhereInput | CreatorVideoViewWhereInput[]
    OR?: CreatorVideoViewWhereInput[]
    NOT?: CreatorVideoViewWhereInput | CreatorVideoViewWhereInput[]
    creatorVideoId?: StringFilter<"CreatorVideoView"> | string
    viewerProfileId?: StringNullableFilter<"CreatorVideoView"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoView"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }, "id">

  export type CreatorVideoViewOrderByWithAggregationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    viewerProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreatorVideoViewCountOrderByAggregateInput
    _max?: CreatorVideoViewMaxOrderByAggregateInput
    _min?: CreatorVideoViewMinOrderByAggregateInput
  }

  export type CreatorVideoViewScalarWhereWithAggregatesInput = {
    AND?: CreatorVideoViewScalarWhereWithAggregatesInput | CreatorVideoViewScalarWhereWithAggregatesInput[]
    OR?: CreatorVideoViewScalarWhereWithAggregatesInput[]
    NOT?: CreatorVideoViewScalarWhereWithAggregatesInput | CreatorVideoViewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorVideoView"> | string
    creatorVideoId?: StringWithAggregatesFilter<"CreatorVideoView"> | string
    viewerProfileId?: StringNullableWithAggregatesFilter<"CreatorVideoView"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreatorVideoView"> | Date | string
  }

  export type CreatorVideoLikeWhereInput = {
    AND?: CreatorVideoLikeWhereInput | CreatorVideoLikeWhereInput[]
    OR?: CreatorVideoLikeWhereInput[]
    NOT?: CreatorVideoLikeWhereInput | CreatorVideoLikeWhereInput[]
    id?: StringFilter<"CreatorVideoLike"> | string
    creatorVideoId?: StringFilter<"CreatorVideoLike"> | string
    likerProfileId?: StringNullableFilter<"CreatorVideoLike"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoLike"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }

  export type CreatorVideoLikeOrderByWithRelationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    likerProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    creatorVideo?: CreatorVideoOrderByWithRelationInput
  }

  export type CreatorVideoLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreatorVideoLikeWhereInput | CreatorVideoLikeWhereInput[]
    OR?: CreatorVideoLikeWhereInput[]
    NOT?: CreatorVideoLikeWhereInput | CreatorVideoLikeWhereInput[]
    creatorVideoId?: StringFilter<"CreatorVideoLike"> | string
    likerProfileId?: StringNullableFilter<"CreatorVideoLike"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoLike"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }, "id">

  export type CreatorVideoLikeOrderByWithAggregationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    likerProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreatorVideoLikeCountOrderByAggregateInput
    _max?: CreatorVideoLikeMaxOrderByAggregateInput
    _min?: CreatorVideoLikeMinOrderByAggregateInput
  }

  export type CreatorVideoLikeScalarWhereWithAggregatesInput = {
    AND?: CreatorVideoLikeScalarWhereWithAggregatesInput | CreatorVideoLikeScalarWhereWithAggregatesInput[]
    OR?: CreatorVideoLikeScalarWhereWithAggregatesInput[]
    NOT?: CreatorVideoLikeScalarWhereWithAggregatesInput | CreatorVideoLikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorVideoLike"> | string
    creatorVideoId?: StringWithAggregatesFilter<"CreatorVideoLike"> | string
    likerProfileId?: StringNullableWithAggregatesFilter<"CreatorVideoLike"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreatorVideoLike"> | Date | string
  }

  export type CreatorVideoCommentWhereInput = {
    AND?: CreatorVideoCommentWhereInput | CreatorVideoCommentWhereInput[]
    OR?: CreatorVideoCommentWhereInput[]
    NOT?: CreatorVideoCommentWhereInput | CreatorVideoCommentWhereInput[]
    id?: StringFilter<"CreatorVideoComment"> | string
    creatorVideoId?: StringFilter<"CreatorVideoComment"> | string
    commenterProfileId?: StringNullableFilter<"CreatorVideoComment"> | string | null
    content?: StringFilter<"CreatorVideoComment"> | string
    createdAt?: DateTimeFilter<"CreatorVideoComment"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }

  export type CreatorVideoCommentOrderByWithRelationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    commenterProfileId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    creatorVideo?: CreatorVideoOrderByWithRelationInput
  }

  export type CreatorVideoCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreatorVideoCommentWhereInput | CreatorVideoCommentWhereInput[]
    OR?: CreatorVideoCommentWhereInput[]
    NOT?: CreatorVideoCommentWhereInput | CreatorVideoCommentWhereInput[]
    creatorVideoId?: StringFilter<"CreatorVideoComment"> | string
    commenterProfileId?: StringNullableFilter<"CreatorVideoComment"> | string | null
    content?: StringFilter<"CreatorVideoComment"> | string
    createdAt?: DateTimeFilter<"CreatorVideoComment"> | Date | string
    creatorVideo?: XOR<CreatorVideoScalarRelationFilter, CreatorVideoWhereInput>
  }, "id">

  export type CreatorVideoCommentOrderByWithAggregationInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    commenterProfileId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CreatorVideoCommentCountOrderByAggregateInput
    _max?: CreatorVideoCommentMaxOrderByAggregateInput
    _min?: CreatorVideoCommentMinOrderByAggregateInput
  }

  export type CreatorVideoCommentScalarWhereWithAggregatesInput = {
    AND?: CreatorVideoCommentScalarWhereWithAggregatesInput | CreatorVideoCommentScalarWhereWithAggregatesInput[]
    OR?: CreatorVideoCommentScalarWhereWithAggregatesInput[]
    NOT?: CreatorVideoCommentScalarWhereWithAggregatesInput | CreatorVideoCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorVideoComment"> | string
    creatorVideoId?: StringWithAggregatesFilter<"CreatorVideoComment"> | string
    commenterProfileId?: StringNullableWithAggregatesFilter<"CreatorVideoComment"> | string | null
    content?: StringWithAggregatesFilter<"CreatorVideoComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CreatorVideoComment"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type ProfileCreateInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorCreateNestedOneWithoutProfileInput
    credential?: AuthCredentialCreateNestedOneWithoutProfileInput
    session?: SessionCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorUncheckedCreateNestedOneWithoutProfileInput
    credential?: AuthCredentialUncheckedCreateNestedOneWithoutProfileInput
    session?: SessionUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneWithoutProfileNestedInput
    credential?: AuthCredentialUpdateOneWithoutProfileNestedInput
    session?: SessionUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUncheckedUpdateOneWithoutProfileNestedInput
    credential?: AuthCredentialUncheckedUpdateOneWithoutProfileNestedInput
    session?: SessionUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminSettingCreateInput = {
    id: string
    section: $Enums.SuperAdminSettingSection
    platformFeePercentage?: number | null
    enterpriseFeePercentage?: number | null
    minimumPayoutAmount?: number | null
    payoutProcessingDays?: number | null
    companyName?: string | null
    companyEmail?: string | null
    supportEmail?: string | null
    companyPhone?: string | null
    companyAddress?: string | null
    companyWebsite?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminSettingUncheckedCreateInput = {
    id: string
    section: $Enums.SuperAdminSettingSection
    platformFeePercentage?: number | null
    enterpriseFeePercentage?: number | null
    minimumPayoutAmount?: number | null
    payoutProcessingDays?: number | null
    companyName?: string | null
    companyEmail?: string | null
    supportEmail?: string | null
    companyPhone?: string | null
    companyAddress?: string | null
    companyWebsite?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: EnumSuperAdminSettingSectionFieldUpdateOperationsInput | $Enums.SuperAdminSettingSection
    platformFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    enterpriseFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minimumPayoutAmount?: NullableIntFieldUpdateOperationsInput | number | null
    payoutProcessingDays?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: NullableStringFieldUpdateOperationsInput | string | null
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    companyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: EnumSuperAdminSettingSectionFieldUpdateOperationsInput | $Enums.SuperAdminSettingSection
    platformFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    enterpriseFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minimumPayoutAmount?: NullableIntFieldUpdateOperationsInput | number | null
    payoutProcessingDays?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: NullableStringFieldUpdateOperationsInput | string | null
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    companyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminSettingCreateManyInput = {
    id: string
    section: $Enums.SuperAdminSettingSection
    platformFeePercentage?: number | null
    enterpriseFeePercentage?: number | null
    minimumPayoutAmount?: number | null
    payoutProcessingDays?: number | null
    companyName?: string | null
    companyEmail?: string | null
    supportEmail?: string | null
    companyPhone?: string | null
    companyAddress?: string | null
    companyWebsite?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: EnumSuperAdminSettingSectionFieldUpdateOperationsInput | $Enums.SuperAdminSettingSection
    platformFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    enterpriseFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minimumPayoutAmount?: NullableIntFieldUpdateOperationsInput | number | null
    payoutProcessingDays?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: NullableStringFieldUpdateOperationsInput | string | null
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    companyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: EnumSuperAdminSettingSectionFieldUpdateOperationsInput | $Enums.SuperAdminSettingSection
    platformFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    enterpriseFeePercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minimumPayoutAmount?: NullableIntFieldUpdateOperationsInput | number | null
    payoutProcessingDays?: NullableIntFieldUpdateOperationsInput | number | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: NullableStringFieldUpdateOperationsInput | string | null
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    companyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyAddress?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthCredentialCreateInput = {
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutCredentialInput
  }

  export type AuthCredentialUncheckedCreateInput = {
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthCredentialUpdateInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutCredentialNestedInput
  }

  export type AuthCredentialUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthCredentialCreateManyInput = {
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthCredentialUpdateManyMutationInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthCredentialUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutCreatorInput
    videos?: CreatorVideoCreateNestedManyWithoutCreatorInput
    folders?: CreatorVideoFolderCreateNestedManyWithoutCreatorInput
  }

  export type CreatorUncheckedCreateInput = {
    id: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoUncheckedCreateNestedManyWithoutCreatorInput
    folders?: CreatorVideoFolderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type CreatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutCreatorNestedInput
    videos?: CreatorVideoUpdateManyWithoutCreatorNestedInput
    folders?: CreatorVideoFolderUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUncheckedUpdateManyWithoutCreatorNestedInput
    folders?: CreatorVideoFolderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorCreateManyInput = {
    id: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoFolderCreateInput = {
    id: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutFoldersInput
    videos?: CreatorVideoCreateNestedManyWithoutFolderInput
  }

  export type CreatorVideoFolderUncheckedCreateInput = {
    id: string
    creatorId: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoUncheckedCreateNestedManyWithoutFolderInput
  }

  export type CreatorVideoFolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutFoldersNestedInput
    videos?: CreatorVideoUpdateManyWithoutFolderNestedInput
  }

  export type CreatorVideoFolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type CreatorVideoFolderCreateManyInput = {
    id: string
    creatorId: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoFolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoFolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCreateInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutVideosInput
    folder: CreatorVideoFolderCreateNestedOneWithoutVideosInput
    views?: CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateInput = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    views?: CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutVideosNestedInput
    folder?: CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput
    views?: CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    views?: CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoCreateManyInput = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewCreateInput = {
    id: string
    viewerProfileId?: string | null
    createdAt?: Date | string
    creatorVideo: CreatorVideoCreateNestedOneWithoutViewsInput
  }

  export type CreatorVideoViewUncheckedCreateInput = {
    id: string
    creatorVideoId: string
    viewerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoViewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorVideo?: CreatorVideoUpdateOneRequiredWithoutViewsNestedInput
  }

  export type CreatorVideoViewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewCreateManyInput = {
    id: string
    creatorVideoId: string
    viewerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoViewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeCreateInput = {
    id: string
    likerProfileId?: string | null
    createdAt?: Date | string
    creatorVideo: CreatorVideoCreateNestedOneWithoutLikesInput
  }

  export type CreatorVideoLikeUncheckedCreateInput = {
    id: string
    creatorVideoId: string
    likerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorVideo?: CreatorVideoUpdateOneRequiredWithoutLikesNestedInput
  }

  export type CreatorVideoLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeCreateManyInput = {
    id: string
    creatorVideoId: string
    likerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentCreateInput = {
    id: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
    creatorVideo: CreatorVideoCreateNestedOneWithoutCommentsInput
  }

  export type CreatorVideoCommentUncheckedCreateInput = {
    id: string
    creatorVideoId: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CreatorVideoCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorVideo?: CreatorVideoUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CreatorVideoCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentCreateManyInput = {
    id: string
    creatorVideoId: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CreatorVideoCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorVideoId?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    sessionToken: string
    expires: Date | string
    profile: ProfileCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CreatorNullableScalarRelationFilter = {
    is?: CreatorWhereInput | null
    isNot?: CreatorWhereInput | null
  }

  export type AuthCredentialNullableScalarRelationFilter = {
    is?: AuthCredentialWhereInput | null
    isNot?: AuthCredentialWhereInput | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    addressFull?: SortOrder
    addressLat?: SortOrder
    addressLon?: SortOrder
    addressType?: SortOrder
    addressCountry?: SortOrder
    addressState?: SortOrder
    addressName?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    emailVerified?: SortOrder
    hasPassword?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    addressLat?: SortOrder
    addressLon?: SortOrder
    age?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    addressFull?: SortOrder
    addressLat?: SortOrder
    addressLon?: SortOrder
    addressType?: SortOrder
    addressCountry?: SortOrder
    addressState?: SortOrder
    addressName?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    emailVerified?: SortOrder
    hasPassword?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    addressFull?: SortOrder
    addressLat?: SortOrder
    addressLon?: SortOrder
    addressType?: SortOrder
    addressCountry?: SortOrder
    addressState?: SortOrder
    addressName?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    emailVerified?: SortOrder
    hasPassword?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    addressLat?: SortOrder
    addressLon?: SortOrder
    age?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSuperAdminSettingSectionFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminSettingSection | EnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel> | $Enums.SuperAdminSettingSection
  }

  export type SuperAdminSettingCountOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    platformFeePercentage?: SortOrder
    enterpriseFeePercentage?: SortOrder
    minimumPayoutAmount?: SortOrder
    payoutProcessingDays?: SortOrder
    companyName?: SortOrder
    companyEmail?: SortOrder
    supportEmail?: SortOrder
    companyPhone?: SortOrder
    companyAddress?: SortOrder
    companyWebsite?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminSettingAvgOrderByAggregateInput = {
    platformFeePercentage?: SortOrder
    enterpriseFeePercentage?: SortOrder
    minimumPayoutAmount?: SortOrder
    payoutProcessingDays?: SortOrder
  }

  export type SuperAdminSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    platformFeePercentage?: SortOrder
    enterpriseFeePercentage?: SortOrder
    minimumPayoutAmount?: SortOrder
    payoutProcessingDays?: SortOrder
    companyName?: SortOrder
    companyEmail?: SortOrder
    supportEmail?: SortOrder
    companyPhone?: SortOrder
    companyAddress?: SortOrder
    companyWebsite?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminSettingMinOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    platformFeePercentage?: SortOrder
    enterpriseFeePercentage?: SortOrder
    minimumPayoutAmount?: SortOrder
    payoutProcessingDays?: SortOrder
    companyName?: SortOrder
    companyEmail?: SortOrder
    supportEmail?: SortOrder
    companyPhone?: SortOrder
    companyAddress?: SortOrder
    companyWebsite?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminSettingSumOrderByAggregateInput = {
    platformFeePercentage?: SortOrder
    enterpriseFeePercentage?: SortOrder
    minimumPayoutAmount?: SortOrder
    payoutProcessingDays?: SortOrder
  }

  export type EnumSuperAdminSettingSectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminSettingSection | EnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminSettingSectionWithAggregatesFilter<$PrismaModel> | $Enums.SuperAdminSettingSection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel>
    _max?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type AuthCredentialCountOrderByAggregateInput = {
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthCredentialMaxOrderByAggregateInput = {
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthCredentialMinOrderByAggregateInput = {
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoListRelationFilter = {
    every?: CreatorVideoWhereInput
    some?: CreatorVideoWhereInput
    none?: CreatorVideoWhereInput
  }

  export type CreatorVideoFolderListRelationFilter = {
    every?: CreatorVideoFolderWhereInput
    some?: CreatorVideoFolderWhereInput
    none?: CreatorVideoFolderWhereInput
  }

  export type CreatorVideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorVideoFolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorScalarRelationFilter = {
    is?: CreatorWhereInput
    isNot?: CreatorWhereInput
  }

  export type CreatorVideoFolderCountOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    folderType?: SortOrder
    status?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoFolderMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    folderType?: SortOrder
    status?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoFolderMinOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    folderType?: SortOrder
    status?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CreatorVideoFolderScalarRelationFilter = {
    is?: CreatorVideoFolderWhereInput
    isNot?: CreatorVideoFolderWhereInput
  }

  export type CreatorVideoViewListRelationFilter = {
    every?: CreatorVideoViewWhereInput
    some?: CreatorVideoViewWhereInput
    none?: CreatorVideoViewWhereInput
  }

  export type CreatorVideoLikeListRelationFilter = {
    every?: CreatorVideoLikeWhereInput
    some?: CreatorVideoLikeWhereInput
    none?: CreatorVideoLikeWhereInput
  }

  export type CreatorVideoCommentListRelationFilter = {
    every?: CreatorVideoCommentWhereInput
    some?: CreatorVideoCommentWhereInput
    none?: CreatorVideoCommentWhereInput
  }

  export type CreatorVideoViewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorVideoLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorVideoCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorVideoCountOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    folderId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    videoUrl?: SortOrder
    videoFileId?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    isPrivate?: SortOrder
    isPremium?: SortOrder
    monetizationType?: SortOrder
    status?: SortOrder
    publishNow?: SortOrder
    scheduledAt?: SortOrder
    rent24Price?: SortOrder
    rent48Price?: SortOrder
    purchasePrice?: SortOrder
    tags?: SortOrder
    packageName?: SortOrder
    episodeIndex?: SortOrder
    duration?: SortOrder
    allowComments?: SortOrder
    ageRestriction?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoAvgOrderByAggregateInput = {
    rent24Price?: SortOrder
    rent48Price?: SortOrder
    purchasePrice?: SortOrder
    episodeIndex?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
  }

  export type CreatorVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    folderId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    videoUrl?: SortOrder
    videoFileId?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    isPrivate?: SortOrder
    isPremium?: SortOrder
    monetizationType?: SortOrder
    status?: SortOrder
    publishNow?: SortOrder
    scheduledAt?: SortOrder
    rent24Price?: SortOrder
    rent48Price?: SortOrder
    purchasePrice?: SortOrder
    packageName?: SortOrder
    episodeIndex?: SortOrder
    duration?: SortOrder
    allowComments?: SortOrder
    ageRestriction?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoMinOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    folderId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    videoUrl?: SortOrder
    videoFileId?: SortOrder
    thumbnailUrl?: SortOrder
    thumbnailFileId?: SortOrder
    isPrivate?: SortOrder
    isPremium?: SortOrder
    monetizationType?: SortOrder
    status?: SortOrder
    publishNow?: SortOrder
    scheduledAt?: SortOrder
    rent24Price?: SortOrder
    rent48Price?: SortOrder
    purchasePrice?: SortOrder
    packageName?: SortOrder
    episodeIndex?: SortOrder
    duration?: SortOrder
    allowComments?: SortOrder
    ageRestriction?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorVideoSumOrderByAggregateInput = {
    rent24Price?: SortOrder
    rent48Price?: SortOrder
    purchasePrice?: SortOrder
    episodeIndex?: SortOrder
    viewsCount?: SortOrder
    likesCount?: SortOrder
    commentsCount?: SortOrder
    revenue?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CreatorVideoScalarRelationFilter = {
    is?: CreatorVideoWhereInput
    isNot?: CreatorVideoWhereInput
  }

  export type CreatorVideoViewCountOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    viewerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoViewMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    viewerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoViewMinOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    viewerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoLikeCountOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    likerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    likerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoLikeMinOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    likerProfileId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoCommentCountOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    commenterProfileId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    commenterProfileId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CreatorVideoCommentMinOrderByAggregateInput = {
    id?: SortOrder
    creatorVideoId?: SortOrder
    commenterProfileId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type CreatorCreateNestedOneWithoutProfileInput = {
    create?: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutProfileInput
    connect?: CreatorWhereUniqueInput
  }

  export type AuthCredentialCreateNestedOneWithoutProfileInput = {
    create?: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthCredentialCreateOrConnectWithoutProfileInput
    connect?: AuthCredentialWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutProfileInput = {
    create?: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput> | SessionCreateWithoutProfileInput[] | SessionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProfileInput | SessionCreateOrConnectWithoutProfileInput[]
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type CreatorUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutProfileInput
    connect?: CreatorWhereUniqueInput
  }

  export type AuthCredentialUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthCredentialCreateOrConnectWithoutProfileInput
    connect?: AuthCredentialWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput> | SessionCreateWithoutProfileInput[] | SessionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProfileInput | SessionCreateOrConnectWithoutProfileInput[]
    createMany?: SessionCreateManyProfileInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CreatorUpdateOneWithoutProfileNestedInput = {
    create?: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutProfileInput
    upsert?: CreatorUpsertWithoutProfileInput
    disconnect?: CreatorWhereInput | boolean
    delete?: CreatorWhereInput | boolean
    connect?: CreatorWhereUniqueInput
    update?: XOR<XOR<CreatorUpdateToOneWithWhereWithoutProfileInput, CreatorUpdateWithoutProfileInput>, CreatorUncheckedUpdateWithoutProfileInput>
  }

  export type AuthCredentialUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthCredentialCreateOrConnectWithoutProfileInput
    upsert?: AuthCredentialUpsertWithoutProfileInput
    disconnect?: AuthCredentialWhereInput | boolean
    delete?: AuthCredentialWhereInput | boolean
    connect?: AuthCredentialWhereUniqueInput
    update?: XOR<XOR<AuthCredentialUpdateToOneWithWhereWithoutProfileInput, AuthCredentialUpdateWithoutProfileInput>, AuthCredentialUncheckedUpdateWithoutProfileInput>
  }

  export type SessionUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput> | SessionCreateWithoutProfileInput[] | SessionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProfileInput | SessionCreateOrConnectWithoutProfileInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProfileInput | SessionUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SessionCreateManyProfileInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProfileInput | SessionUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProfileInput | SessionUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type CreatorUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutProfileInput
    upsert?: CreatorUpsertWithoutProfileInput
    disconnect?: CreatorWhereInput | boolean
    delete?: CreatorWhereInput | boolean
    connect?: CreatorWhereUniqueInput
    update?: XOR<XOR<CreatorUpdateToOneWithWhereWithoutProfileInput, CreatorUpdateWithoutProfileInput>, CreatorUncheckedUpdateWithoutProfileInput>
  }

  export type AuthCredentialUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AuthCredentialCreateOrConnectWithoutProfileInput
    upsert?: AuthCredentialUpsertWithoutProfileInput
    disconnect?: AuthCredentialWhereInput | boolean
    delete?: AuthCredentialWhereInput | boolean
    connect?: AuthCredentialWhereUniqueInput
    update?: XOR<XOR<AuthCredentialUpdateToOneWithWhereWithoutProfileInput, AuthCredentialUpdateWithoutProfileInput>, AuthCredentialUncheckedUpdateWithoutProfileInput>
  }

  export type SessionUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput> | SessionCreateWithoutProfileInput[] | SessionUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProfileInput | SessionCreateOrConnectWithoutProfileInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProfileInput | SessionUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: SessionCreateManyProfileInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProfileInput | SessionUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProfileInput | SessionUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EnumSuperAdminSettingSectionFieldUpdateOperationsInput = {
    set?: $Enums.SuperAdminSettingSection
  }

  export type ProfileCreateNestedOneWithoutCredentialInput = {
    create?: XOR<ProfileCreateWithoutCredentialInput, ProfileUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCredentialInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutCredentialNestedInput = {
    create?: XOR<ProfileCreateWithoutCredentialInput, ProfileUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCredentialInput
    upsert?: ProfileUpsertWithoutCredentialInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutCredentialInput, ProfileUpdateWithoutCredentialInput>, ProfileUncheckedUpdateWithoutCredentialInput>
  }

  export type ProfileCreateNestedOneWithoutCreatorInput = {
    create?: XOR<ProfileCreateWithoutCreatorInput, ProfileUncheckedCreateWithoutCreatorInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCreatorInput
    connect?: ProfileWhereUniqueInput
  }

  export type CreatorVideoCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput> | CreatorVideoCreateWithoutCreatorInput[] | CreatorVideoUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCreatorInput | CreatorVideoCreateOrConnectWithoutCreatorInput[]
    createMany?: CreatorVideoCreateManyCreatorInputEnvelope
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
  }

  export type CreatorVideoFolderCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput> | CreatorVideoFolderCreateWithoutCreatorInput[] | CreatorVideoFolderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutCreatorInput | CreatorVideoFolderCreateOrConnectWithoutCreatorInput[]
    createMany?: CreatorVideoFolderCreateManyCreatorInputEnvelope
    connect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
  }

  export type CreatorVideoUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput> | CreatorVideoCreateWithoutCreatorInput[] | CreatorVideoUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCreatorInput | CreatorVideoCreateOrConnectWithoutCreatorInput[]
    createMany?: CreatorVideoCreateManyCreatorInputEnvelope
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
  }

  export type CreatorVideoFolderUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput> | CreatorVideoFolderCreateWithoutCreatorInput[] | CreatorVideoFolderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutCreatorInput | CreatorVideoFolderCreateOrConnectWithoutCreatorInput[]
    createMany?: CreatorVideoFolderCreateManyCreatorInputEnvelope
    connect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutCreatorNestedInput = {
    create?: XOR<ProfileCreateWithoutCreatorInput, ProfileUncheckedCreateWithoutCreatorInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCreatorInput
    upsert?: ProfileUpsertWithoutCreatorInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutCreatorInput, ProfileUpdateWithoutCreatorInput>, ProfileUncheckedUpdateWithoutCreatorInput>
  }

  export type CreatorVideoUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput> | CreatorVideoCreateWithoutCreatorInput[] | CreatorVideoUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCreatorInput | CreatorVideoCreateOrConnectWithoutCreatorInput[]
    upsert?: CreatorVideoUpsertWithWhereUniqueWithoutCreatorInput | CreatorVideoUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CreatorVideoCreateManyCreatorInputEnvelope
    set?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    disconnect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    delete?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    update?: CreatorVideoUpdateWithWhereUniqueWithoutCreatorInput | CreatorVideoUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CreatorVideoUpdateManyWithWhereWithoutCreatorInput | CreatorVideoUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
  }

  export type CreatorVideoFolderUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput> | CreatorVideoFolderCreateWithoutCreatorInput[] | CreatorVideoFolderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutCreatorInput | CreatorVideoFolderCreateOrConnectWithoutCreatorInput[]
    upsert?: CreatorVideoFolderUpsertWithWhereUniqueWithoutCreatorInput | CreatorVideoFolderUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CreatorVideoFolderCreateManyCreatorInputEnvelope
    set?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    disconnect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    delete?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    connect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    update?: CreatorVideoFolderUpdateWithWhereUniqueWithoutCreatorInput | CreatorVideoFolderUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CreatorVideoFolderUpdateManyWithWhereWithoutCreatorInput | CreatorVideoFolderUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CreatorVideoFolderScalarWhereInput | CreatorVideoFolderScalarWhereInput[]
  }

  export type CreatorVideoUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput> | CreatorVideoCreateWithoutCreatorInput[] | CreatorVideoUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCreatorInput | CreatorVideoCreateOrConnectWithoutCreatorInput[]
    upsert?: CreatorVideoUpsertWithWhereUniqueWithoutCreatorInput | CreatorVideoUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CreatorVideoCreateManyCreatorInputEnvelope
    set?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    disconnect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    delete?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    update?: CreatorVideoUpdateWithWhereUniqueWithoutCreatorInput | CreatorVideoUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CreatorVideoUpdateManyWithWhereWithoutCreatorInput | CreatorVideoUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
  }

  export type CreatorVideoFolderUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput> | CreatorVideoFolderCreateWithoutCreatorInput[] | CreatorVideoFolderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutCreatorInput | CreatorVideoFolderCreateOrConnectWithoutCreatorInput[]
    upsert?: CreatorVideoFolderUpsertWithWhereUniqueWithoutCreatorInput | CreatorVideoFolderUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CreatorVideoFolderCreateManyCreatorInputEnvelope
    set?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    disconnect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    delete?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    connect?: CreatorVideoFolderWhereUniqueInput | CreatorVideoFolderWhereUniqueInput[]
    update?: CreatorVideoFolderUpdateWithWhereUniqueWithoutCreatorInput | CreatorVideoFolderUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CreatorVideoFolderUpdateManyWithWhereWithoutCreatorInput | CreatorVideoFolderUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CreatorVideoFolderScalarWhereInput | CreatorVideoFolderScalarWhereInput[]
  }

  export type CreatorCreateNestedOneWithoutFoldersInput = {
    create?: XOR<CreatorCreateWithoutFoldersInput, CreatorUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutFoldersInput
    connect?: CreatorWhereUniqueInput
  }

  export type CreatorVideoCreateNestedManyWithoutFolderInput = {
    create?: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput> | CreatorVideoCreateWithoutFolderInput[] | CreatorVideoUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutFolderInput | CreatorVideoCreateOrConnectWithoutFolderInput[]
    createMany?: CreatorVideoCreateManyFolderInputEnvelope
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
  }

  export type CreatorVideoUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput> | CreatorVideoCreateWithoutFolderInput[] | CreatorVideoUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutFolderInput | CreatorVideoCreateOrConnectWithoutFolderInput[]
    createMany?: CreatorVideoCreateManyFolderInputEnvelope
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
  }

  export type CreatorUpdateOneRequiredWithoutFoldersNestedInput = {
    create?: XOR<CreatorCreateWithoutFoldersInput, CreatorUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutFoldersInput
    upsert?: CreatorUpsertWithoutFoldersInput
    connect?: CreatorWhereUniqueInput
    update?: XOR<XOR<CreatorUpdateToOneWithWhereWithoutFoldersInput, CreatorUpdateWithoutFoldersInput>, CreatorUncheckedUpdateWithoutFoldersInput>
  }

  export type CreatorVideoUpdateManyWithoutFolderNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput> | CreatorVideoCreateWithoutFolderInput[] | CreatorVideoUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutFolderInput | CreatorVideoCreateOrConnectWithoutFolderInput[]
    upsert?: CreatorVideoUpsertWithWhereUniqueWithoutFolderInput | CreatorVideoUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: CreatorVideoCreateManyFolderInputEnvelope
    set?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    disconnect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    delete?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    update?: CreatorVideoUpdateWithWhereUniqueWithoutFolderInput | CreatorVideoUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: CreatorVideoUpdateManyWithWhereWithoutFolderInput | CreatorVideoUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
  }

  export type CreatorVideoUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput> | CreatorVideoCreateWithoutFolderInput[] | CreatorVideoUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutFolderInput | CreatorVideoCreateOrConnectWithoutFolderInput[]
    upsert?: CreatorVideoUpsertWithWhereUniqueWithoutFolderInput | CreatorVideoUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: CreatorVideoCreateManyFolderInputEnvelope
    set?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    disconnect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    delete?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    connect?: CreatorVideoWhereUniqueInput | CreatorVideoWhereUniqueInput[]
    update?: CreatorVideoUpdateWithWhereUniqueWithoutFolderInput | CreatorVideoUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: CreatorVideoUpdateManyWithWhereWithoutFolderInput | CreatorVideoUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
  }

  export type CreatorVideoCreatetagsInput = {
    set: string[]
  }

  export type CreatorCreateNestedOneWithoutVideosInput = {
    create?: XOR<CreatorCreateWithoutVideosInput, CreatorUncheckedCreateWithoutVideosInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutVideosInput
    connect?: CreatorWhereUniqueInput
  }

  export type CreatorVideoFolderCreateNestedOneWithoutVideosInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutVideosInput, CreatorVideoFolderUncheckedCreateWithoutVideosInput>
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutVideosInput
    connect?: CreatorVideoFolderWhereUniqueInput
  }

  export type CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoViewCreateWithoutCreatorVideoInput[] | CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput | CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoViewCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
  }

  export type CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoLikeCreateWithoutCreatorVideoInput[] | CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput | CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoLikeCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
  }

  export type CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoCommentCreateWithoutCreatorVideoInput[] | CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput | CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoCommentCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
  }

  export type CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoViewCreateWithoutCreatorVideoInput[] | CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput | CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoViewCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
  }

  export type CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoLikeCreateWithoutCreatorVideoInput[] | CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput | CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoLikeCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
  }

  export type CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput = {
    create?: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoCommentCreateWithoutCreatorVideoInput[] | CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput | CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput[]
    createMany?: CreatorVideoCommentCreateManyCreatorVideoInputEnvelope
    connect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
  }

  export type CreatorVideoUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CreatorUpdateOneRequiredWithoutVideosNestedInput = {
    create?: XOR<CreatorCreateWithoutVideosInput, CreatorUncheckedCreateWithoutVideosInput>
    connectOrCreate?: CreatorCreateOrConnectWithoutVideosInput
    upsert?: CreatorUpsertWithoutVideosInput
    connect?: CreatorWhereUniqueInput
    update?: XOR<XOR<CreatorUpdateToOneWithWhereWithoutVideosInput, CreatorUpdateWithoutVideosInput>, CreatorUncheckedUpdateWithoutVideosInput>
  }

  export type CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput = {
    create?: XOR<CreatorVideoFolderCreateWithoutVideosInput, CreatorVideoFolderUncheckedCreateWithoutVideosInput>
    connectOrCreate?: CreatorVideoFolderCreateOrConnectWithoutVideosInput
    upsert?: CreatorVideoFolderUpsertWithoutVideosInput
    connect?: CreatorVideoFolderWhereUniqueInput
    update?: XOR<XOR<CreatorVideoFolderUpdateToOneWithWhereWithoutVideosInput, CreatorVideoFolderUpdateWithoutVideosInput>, CreatorVideoFolderUncheckedUpdateWithoutVideosInput>
  }

  export type CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoViewCreateWithoutCreatorVideoInput[] | CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput | CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoViewUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoViewUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoViewCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    disconnect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    delete?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    connect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    update?: CreatorVideoViewUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoViewUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoViewUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoViewUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoViewScalarWhereInput | CreatorVideoViewScalarWhereInput[]
  }

  export type CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoLikeCreateWithoutCreatorVideoInput[] | CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput | CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoLikeUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoLikeUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoLikeCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    disconnect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    delete?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    connect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    update?: CreatorVideoLikeUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoLikeUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoLikeUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoLikeUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoLikeScalarWhereInput | CreatorVideoLikeScalarWhereInput[]
  }

  export type CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoCommentCreateWithoutCreatorVideoInput[] | CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput | CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoCommentUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoCommentUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoCommentCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    disconnect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    delete?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    connect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    update?: CreatorVideoCommentUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoCommentUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoCommentUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoCommentUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoCommentScalarWhereInput | CreatorVideoCommentScalarWhereInput[]
  }

  export type CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoViewCreateWithoutCreatorVideoInput[] | CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput | CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoViewUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoViewUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoViewCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    disconnect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    delete?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    connect?: CreatorVideoViewWhereUniqueInput | CreatorVideoViewWhereUniqueInput[]
    update?: CreatorVideoViewUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoViewUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoViewUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoViewUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoViewScalarWhereInput | CreatorVideoViewScalarWhereInput[]
  }

  export type CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoLikeCreateWithoutCreatorVideoInput[] | CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput | CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoLikeUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoLikeUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoLikeCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    disconnect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    delete?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    connect?: CreatorVideoLikeWhereUniqueInput | CreatorVideoLikeWhereUniqueInput[]
    update?: CreatorVideoLikeUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoLikeUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoLikeUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoLikeUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoLikeScalarWhereInput | CreatorVideoLikeScalarWhereInput[]
  }

  export type CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput = {
    create?: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput> | CreatorVideoCommentCreateWithoutCreatorVideoInput[] | CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput[]
    connectOrCreate?: CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput | CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput[]
    upsert?: CreatorVideoCommentUpsertWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoCommentUpsertWithWhereUniqueWithoutCreatorVideoInput[]
    createMany?: CreatorVideoCommentCreateManyCreatorVideoInputEnvelope
    set?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    disconnect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    delete?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    connect?: CreatorVideoCommentWhereUniqueInput | CreatorVideoCommentWhereUniqueInput[]
    update?: CreatorVideoCommentUpdateWithWhereUniqueWithoutCreatorVideoInput | CreatorVideoCommentUpdateWithWhereUniqueWithoutCreatorVideoInput[]
    updateMany?: CreatorVideoCommentUpdateManyWithWhereWithoutCreatorVideoInput | CreatorVideoCommentUpdateManyWithWhereWithoutCreatorVideoInput[]
    deleteMany?: CreatorVideoCommentScalarWhereInput | CreatorVideoCommentScalarWhereInput[]
  }

  export type CreatorVideoCreateNestedOneWithoutViewsInput = {
    create?: XOR<CreatorVideoCreateWithoutViewsInput, CreatorVideoUncheckedCreateWithoutViewsInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutViewsInput
    connect?: CreatorVideoWhereUniqueInput
  }

  export type CreatorVideoUpdateOneRequiredWithoutViewsNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutViewsInput, CreatorVideoUncheckedCreateWithoutViewsInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutViewsInput
    upsert?: CreatorVideoUpsertWithoutViewsInput
    connect?: CreatorVideoWhereUniqueInput
    update?: XOR<XOR<CreatorVideoUpdateToOneWithWhereWithoutViewsInput, CreatorVideoUpdateWithoutViewsInput>, CreatorVideoUncheckedUpdateWithoutViewsInput>
  }

  export type CreatorVideoCreateNestedOneWithoutLikesInput = {
    create?: XOR<CreatorVideoCreateWithoutLikesInput, CreatorVideoUncheckedCreateWithoutLikesInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutLikesInput
    connect?: CreatorVideoWhereUniqueInput
  }

  export type CreatorVideoUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutLikesInput, CreatorVideoUncheckedCreateWithoutLikesInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutLikesInput
    upsert?: CreatorVideoUpsertWithoutLikesInput
    connect?: CreatorVideoWhereUniqueInput
    update?: XOR<XOR<CreatorVideoUpdateToOneWithWhereWithoutLikesInput, CreatorVideoUpdateWithoutLikesInput>, CreatorVideoUncheckedUpdateWithoutLikesInput>
  }

  export type CreatorVideoCreateNestedOneWithoutCommentsInput = {
    create?: XOR<CreatorVideoCreateWithoutCommentsInput, CreatorVideoUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCommentsInput
    connect?: CreatorVideoWhereUniqueInput
  }

  export type CreatorVideoUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<CreatorVideoCreateWithoutCommentsInput, CreatorVideoUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CreatorVideoCreateOrConnectWithoutCommentsInput
    upsert?: CreatorVideoUpsertWithoutCommentsInput
    connect?: CreatorVideoWhereUniqueInput
    update?: XOR<XOR<CreatorVideoUpdateToOneWithWhereWithoutCommentsInput, CreatorVideoUpdateWithoutCommentsInput>, CreatorVideoUncheckedUpdateWithoutCommentsInput>
  }

  export type ProfileCreateNestedOneWithoutSessionInput = {
    create?: XOR<ProfileCreateWithoutSessionInput, ProfileUncheckedCreateWithoutSessionInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSessionInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<ProfileCreateWithoutSessionInput, ProfileUncheckedCreateWithoutSessionInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSessionInput
    upsert?: ProfileUpsertWithoutSessionInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutSessionInput, ProfileUpdateWithoutSessionInput>, ProfileUncheckedUpdateWithoutSessionInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSuperAdminSettingSectionFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminSettingSection | EnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel> | $Enums.SuperAdminSettingSection
  }

  export type NestedEnumSuperAdminSettingSectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminSettingSection | EnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminSettingSection[] | ListEnumSuperAdminSettingSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminSettingSectionWithAggregatesFilter<$PrismaModel> | $Enums.SuperAdminSettingSection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel>
    _max?: NestedEnumSuperAdminSettingSectionFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CreatorCreateWithoutProfileInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoCreateNestedManyWithoutCreatorInput
    folders?: CreatorVideoFolderCreateNestedManyWithoutCreatorInput
  }

  export type CreatorUncheckedCreateWithoutProfileInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoUncheckedCreateNestedManyWithoutCreatorInput
    folders?: CreatorVideoFolderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type CreatorCreateOrConnectWithoutProfileInput = {
    where: CreatorWhereUniqueInput
    create: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
  }

  export type AuthCredentialCreateWithoutProfileInput = {
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthCredentialUncheckedCreateWithoutProfileInput = {
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthCredentialCreateOrConnectWithoutProfileInput = {
    where: AuthCredentialWhereUniqueInput
    create: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
  }

  export type SessionCreateWithoutProfileInput = {
    id: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutProfileInput = {
    id: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutProfileInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput>
  }

  export type SessionCreateManyProfileInputEnvelope = {
    data: SessionCreateManyProfileInput | SessionCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type CreatorUpsertWithoutProfileInput = {
    update: XOR<CreatorUpdateWithoutProfileInput, CreatorUncheckedUpdateWithoutProfileInput>
    create: XOR<CreatorCreateWithoutProfileInput, CreatorUncheckedCreateWithoutProfileInput>
    where?: CreatorWhereInput
  }

  export type CreatorUpdateToOneWithWhereWithoutProfileInput = {
    where?: CreatorWhereInput
    data: XOR<CreatorUpdateWithoutProfileInput, CreatorUncheckedUpdateWithoutProfileInput>
  }

  export type CreatorUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUpdateManyWithoutCreatorNestedInput
    folders?: CreatorVideoFolderUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUncheckedUpdateManyWithoutCreatorNestedInput
    folders?: CreatorVideoFolderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type AuthCredentialUpsertWithoutProfileInput = {
    update: XOR<AuthCredentialUpdateWithoutProfileInput, AuthCredentialUncheckedUpdateWithoutProfileInput>
    create: XOR<AuthCredentialCreateWithoutProfileInput, AuthCredentialUncheckedCreateWithoutProfileInput>
    where?: AuthCredentialWhereInput
  }

  export type AuthCredentialUpdateToOneWithWhereWithoutProfileInput = {
    where?: AuthCredentialWhereInput
    data: XOR<AuthCredentialUpdateWithoutProfileInput, AuthCredentialUncheckedUpdateWithoutProfileInput>
  }

  export type AuthCredentialUpdateWithoutProfileInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthCredentialUncheckedUpdateWithoutProfileInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutProfileInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutProfileInput, SessionUncheckedUpdateWithoutProfileInput>
    create: XOR<SessionCreateWithoutProfileInput, SessionUncheckedCreateWithoutProfileInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutProfileInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutProfileInput, SessionUncheckedUpdateWithoutProfileInput>
  }

  export type SessionUpdateManyWithWhereWithoutProfileInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutProfileInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type ProfileCreateWithoutCredentialInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorCreateNestedOneWithoutProfileInput
    session?: SessionCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutCredentialInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorUncheckedCreateNestedOneWithoutProfileInput
    session?: SessionUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutCredentialInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutCredentialInput, ProfileUncheckedCreateWithoutCredentialInput>
  }

  export type ProfileUpsertWithoutCredentialInput = {
    update: XOR<ProfileUpdateWithoutCredentialInput, ProfileUncheckedUpdateWithoutCredentialInput>
    create: XOR<ProfileCreateWithoutCredentialInput, ProfileUncheckedCreateWithoutCredentialInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutCredentialInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutCredentialInput, ProfileUncheckedUpdateWithoutCredentialInput>
  }

  export type ProfileUpdateWithoutCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneWithoutProfileNestedInput
    session?: SessionUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUncheckedUpdateOneWithoutProfileNestedInput
    session?: SessionUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutCreatorInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    credential?: AuthCredentialCreateNestedOneWithoutProfileInput
    session?: SessionCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutCreatorInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    credential?: AuthCredentialUncheckedCreateNestedOneWithoutProfileInput
    session?: SessionUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutCreatorInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutCreatorInput, ProfileUncheckedCreateWithoutCreatorInput>
  }

  export type CreatorVideoCreateWithoutCreatorInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    folder: CreatorVideoFolderCreateNestedOneWithoutVideosInput
    views?: CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateWithoutCreatorInput = {
    id: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    views?: CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoCreateOrConnectWithoutCreatorInput = {
    where: CreatorVideoWhereUniqueInput
    create: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput>
  }

  export type CreatorVideoCreateManyCreatorInputEnvelope = {
    data: CreatorVideoCreateManyCreatorInput | CreatorVideoCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type CreatorVideoFolderCreateWithoutCreatorInput = {
    id: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoCreateNestedManyWithoutFolderInput
  }

  export type CreatorVideoFolderUncheckedCreateWithoutCreatorInput = {
    id: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoUncheckedCreateNestedManyWithoutFolderInput
  }

  export type CreatorVideoFolderCreateOrConnectWithoutCreatorInput = {
    where: CreatorVideoFolderWhereUniqueInput
    create: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput>
  }

  export type CreatorVideoFolderCreateManyCreatorInputEnvelope = {
    data: CreatorVideoFolderCreateManyCreatorInput | CreatorVideoFolderCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutCreatorInput = {
    update: XOR<ProfileUpdateWithoutCreatorInput, ProfileUncheckedUpdateWithoutCreatorInput>
    create: XOR<ProfileCreateWithoutCreatorInput, ProfileUncheckedCreateWithoutCreatorInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutCreatorInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutCreatorInput, ProfileUncheckedUpdateWithoutCreatorInput>
  }

  export type ProfileUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credential?: AuthCredentialUpdateOneWithoutProfileNestedInput
    session?: SessionUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credential?: AuthCredentialUncheckedUpdateOneWithoutProfileNestedInput
    session?: SessionUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type CreatorVideoUpsertWithWhereUniqueWithoutCreatorInput = {
    where: CreatorVideoWhereUniqueInput
    update: XOR<CreatorVideoUpdateWithoutCreatorInput, CreatorVideoUncheckedUpdateWithoutCreatorInput>
    create: XOR<CreatorVideoCreateWithoutCreatorInput, CreatorVideoUncheckedCreateWithoutCreatorInput>
  }

  export type CreatorVideoUpdateWithWhereUniqueWithoutCreatorInput = {
    where: CreatorVideoWhereUniqueInput
    data: XOR<CreatorVideoUpdateWithoutCreatorInput, CreatorVideoUncheckedUpdateWithoutCreatorInput>
  }

  export type CreatorVideoUpdateManyWithWhereWithoutCreatorInput = {
    where: CreatorVideoScalarWhereInput
    data: XOR<CreatorVideoUpdateManyMutationInput, CreatorVideoUncheckedUpdateManyWithoutCreatorInput>
  }

  export type CreatorVideoScalarWhereInput = {
    AND?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
    OR?: CreatorVideoScalarWhereInput[]
    NOT?: CreatorVideoScalarWhereInput | CreatorVideoScalarWhereInput[]
    id?: StringFilter<"CreatorVideo"> | string
    creatorId?: StringFilter<"CreatorVideo"> | string
    folderId?: StringFilter<"CreatorVideo"> | string
    title?: StringFilter<"CreatorVideo"> | string
    description?: StringNullableFilter<"CreatorVideo"> | string | null
    category?: StringNullableFilter<"CreatorVideo"> | string | null
    videoUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    videoFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailUrl?: StringNullableFilter<"CreatorVideo"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideo"> | string | null
    isPrivate?: BoolFilter<"CreatorVideo"> | boolean
    isPremium?: BoolFilter<"CreatorVideo"> | boolean
    monetizationType?: StringFilter<"CreatorVideo"> | string
    status?: StringFilter<"CreatorVideo"> | string
    publishNow?: BoolFilter<"CreatorVideo"> | boolean
    scheduledAt?: DateTimeNullableFilter<"CreatorVideo"> | Date | string | null
    rent24Price?: IntNullableFilter<"CreatorVideo"> | number | null
    rent48Price?: IntNullableFilter<"CreatorVideo"> | number | null
    purchasePrice?: IntNullableFilter<"CreatorVideo"> | number | null
    tags?: StringNullableListFilter<"CreatorVideo">
    packageName?: StringNullableFilter<"CreatorVideo"> | string | null
    episodeIndex?: IntNullableFilter<"CreatorVideo"> | number | null
    duration?: StringNullableFilter<"CreatorVideo"> | string | null
    allowComments?: BoolFilter<"CreatorVideo"> | boolean
    ageRestriction?: BoolFilter<"CreatorVideo"> | boolean
    viewsCount?: IntFilter<"CreatorVideo"> | number
    likesCount?: IntFilter<"CreatorVideo"> | number
    commentsCount?: IntFilter<"CreatorVideo"> | number
    revenue?: IntFilter<"CreatorVideo"> | number
    createdAt?: DateTimeFilter<"CreatorVideo"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideo"> | Date | string
  }

  export type CreatorVideoFolderUpsertWithWhereUniqueWithoutCreatorInput = {
    where: CreatorVideoFolderWhereUniqueInput
    update: XOR<CreatorVideoFolderUpdateWithoutCreatorInput, CreatorVideoFolderUncheckedUpdateWithoutCreatorInput>
    create: XOR<CreatorVideoFolderCreateWithoutCreatorInput, CreatorVideoFolderUncheckedCreateWithoutCreatorInput>
  }

  export type CreatorVideoFolderUpdateWithWhereUniqueWithoutCreatorInput = {
    where: CreatorVideoFolderWhereUniqueInput
    data: XOR<CreatorVideoFolderUpdateWithoutCreatorInput, CreatorVideoFolderUncheckedUpdateWithoutCreatorInput>
  }

  export type CreatorVideoFolderUpdateManyWithWhereWithoutCreatorInput = {
    where: CreatorVideoFolderScalarWhereInput
    data: XOR<CreatorVideoFolderUpdateManyMutationInput, CreatorVideoFolderUncheckedUpdateManyWithoutCreatorInput>
  }

  export type CreatorVideoFolderScalarWhereInput = {
    AND?: CreatorVideoFolderScalarWhereInput | CreatorVideoFolderScalarWhereInput[]
    OR?: CreatorVideoFolderScalarWhereInput[]
    NOT?: CreatorVideoFolderScalarWhereInput | CreatorVideoFolderScalarWhereInput[]
    id?: StringFilter<"CreatorVideoFolder"> | string
    creatorId?: StringFilter<"CreatorVideoFolder"> | string
    title?: StringFilter<"CreatorVideoFolder"> | string
    folderType?: StringFilter<"CreatorVideoFolder"> | string
    status?: StringFilter<"CreatorVideoFolder"> | string
    thumbnailUrl?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    thumbnailFileId?: StringNullableFilter<"CreatorVideoFolder"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorVideoFolder"> | Date | string
  }

  export type CreatorCreateWithoutFoldersInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutCreatorInput
    videos?: CreatorVideoCreateNestedManyWithoutCreatorInput
  }

  export type CreatorUncheckedCreateWithoutFoldersInput = {
    id: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videos?: CreatorVideoUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type CreatorCreateOrConnectWithoutFoldersInput = {
    where: CreatorWhereUniqueInput
    create: XOR<CreatorCreateWithoutFoldersInput, CreatorUncheckedCreateWithoutFoldersInput>
  }

  export type CreatorVideoCreateWithoutFolderInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutVideosInput
    views?: CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateWithoutFolderInput = {
    id: string
    creatorId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    views?: CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoCreateOrConnectWithoutFolderInput = {
    where: CreatorVideoWhereUniqueInput
    create: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput>
  }

  export type CreatorVideoCreateManyFolderInputEnvelope = {
    data: CreatorVideoCreateManyFolderInput | CreatorVideoCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type CreatorUpsertWithoutFoldersInput = {
    update: XOR<CreatorUpdateWithoutFoldersInput, CreatorUncheckedUpdateWithoutFoldersInput>
    create: XOR<CreatorCreateWithoutFoldersInput, CreatorUncheckedCreateWithoutFoldersInput>
    where?: CreatorWhereInput
  }

  export type CreatorUpdateToOneWithWhereWithoutFoldersInput = {
    where?: CreatorWhereInput
    data: XOR<CreatorUpdateWithoutFoldersInput, CreatorUncheckedUpdateWithoutFoldersInput>
  }

  export type CreatorUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutCreatorNestedInput
    videos?: CreatorVideoUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorVideoUpsertWithWhereUniqueWithoutFolderInput = {
    where: CreatorVideoWhereUniqueInput
    update: XOR<CreatorVideoUpdateWithoutFolderInput, CreatorVideoUncheckedUpdateWithoutFolderInput>
    create: XOR<CreatorVideoCreateWithoutFolderInput, CreatorVideoUncheckedCreateWithoutFolderInput>
  }

  export type CreatorVideoUpdateWithWhereUniqueWithoutFolderInput = {
    where: CreatorVideoWhereUniqueInput
    data: XOR<CreatorVideoUpdateWithoutFolderInput, CreatorVideoUncheckedUpdateWithoutFolderInput>
  }

  export type CreatorVideoUpdateManyWithWhereWithoutFolderInput = {
    where: CreatorVideoScalarWhereInput
    data: XOR<CreatorVideoUpdateManyMutationInput, CreatorVideoUncheckedUpdateManyWithoutFolderInput>
  }

  export type CreatorCreateWithoutVideosInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutCreatorInput
    folders?: CreatorVideoFolderCreateNestedManyWithoutCreatorInput
  }

  export type CreatorUncheckedCreateWithoutVideosInput = {
    id: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    folders?: CreatorVideoFolderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type CreatorCreateOrConnectWithoutVideosInput = {
    where: CreatorWhereUniqueInput
    create: XOR<CreatorCreateWithoutVideosInput, CreatorUncheckedCreateWithoutVideosInput>
  }

  export type CreatorVideoFolderCreateWithoutVideosInput = {
    id: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutFoldersInput
  }

  export type CreatorVideoFolderUncheckedCreateWithoutVideosInput = {
    id: string
    creatorId: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoFolderCreateOrConnectWithoutVideosInput = {
    where: CreatorVideoFolderWhereUniqueInput
    create: XOR<CreatorVideoFolderCreateWithoutVideosInput, CreatorVideoFolderUncheckedCreateWithoutVideosInput>
  }

  export type CreatorVideoViewCreateWithoutCreatorVideoInput = {
    id: string
    viewerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput = {
    id: string
    viewerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoViewCreateOrConnectWithoutCreatorVideoInput = {
    where: CreatorVideoViewWhereUniqueInput
    create: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoViewCreateManyCreatorVideoInputEnvelope = {
    data: CreatorVideoViewCreateManyCreatorVideoInput | CreatorVideoViewCreateManyCreatorVideoInput[]
    skipDuplicates?: boolean
  }

  export type CreatorVideoLikeCreateWithoutCreatorVideoInput = {
    id: string
    likerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput = {
    id: string
    likerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoLikeCreateOrConnectWithoutCreatorVideoInput = {
    where: CreatorVideoLikeWhereUniqueInput
    create: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoLikeCreateManyCreatorVideoInputEnvelope = {
    data: CreatorVideoLikeCreateManyCreatorVideoInput | CreatorVideoLikeCreateManyCreatorVideoInput[]
    skipDuplicates?: boolean
  }

  export type CreatorVideoCommentCreateWithoutCreatorVideoInput = {
    id: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput = {
    id: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CreatorVideoCommentCreateOrConnectWithoutCreatorVideoInput = {
    where: CreatorVideoCommentWhereUniqueInput
    create: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoCommentCreateManyCreatorVideoInputEnvelope = {
    data: CreatorVideoCommentCreateManyCreatorVideoInput | CreatorVideoCommentCreateManyCreatorVideoInput[]
    skipDuplicates?: boolean
  }

  export type CreatorUpsertWithoutVideosInput = {
    update: XOR<CreatorUpdateWithoutVideosInput, CreatorUncheckedUpdateWithoutVideosInput>
    create: XOR<CreatorCreateWithoutVideosInput, CreatorUncheckedCreateWithoutVideosInput>
    where?: CreatorWhereInput
  }

  export type CreatorUpdateToOneWithWhereWithoutVideosInput = {
    where?: CreatorWhereInput
    data: XOR<CreatorUpdateWithoutVideosInput, CreatorUncheckedUpdateWithoutVideosInput>
  }

  export type CreatorUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutCreatorNestedInput
    folders?: CreatorVideoFolderUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorUncheckedUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: CreatorVideoFolderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CreatorVideoFolderUpsertWithoutVideosInput = {
    update: XOR<CreatorVideoFolderUpdateWithoutVideosInput, CreatorVideoFolderUncheckedUpdateWithoutVideosInput>
    create: XOR<CreatorVideoFolderCreateWithoutVideosInput, CreatorVideoFolderUncheckedCreateWithoutVideosInput>
    where?: CreatorVideoFolderWhereInput
  }

  export type CreatorVideoFolderUpdateToOneWithWhereWithoutVideosInput = {
    where?: CreatorVideoFolderWhereInput
    data: XOR<CreatorVideoFolderUpdateWithoutVideosInput, CreatorVideoFolderUncheckedUpdateWithoutVideosInput>
  }

  export type CreatorVideoFolderUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutFoldersNestedInput
  }

  export type CreatorVideoFolderUncheckedUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewUpsertWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoViewWhereUniqueInput
    update: XOR<CreatorVideoViewUpdateWithoutCreatorVideoInput, CreatorVideoViewUncheckedUpdateWithoutCreatorVideoInput>
    create: XOR<CreatorVideoViewCreateWithoutCreatorVideoInput, CreatorVideoViewUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoViewUpdateWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoViewWhereUniqueInput
    data: XOR<CreatorVideoViewUpdateWithoutCreatorVideoInput, CreatorVideoViewUncheckedUpdateWithoutCreatorVideoInput>
  }

  export type CreatorVideoViewUpdateManyWithWhereWithoutCreatorVideoInput = {
    where: CreatorVideoViewScalarWhereInput
    data: XOR<CreatorVideoViewUpdateManyMutationInput, CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoInput>
  }

  export type CreatorVideoViewScalarWhereInput = {
    AND?: CreatorVideoViewScalarWhereInput | CreatorVideoViewScalarWhereInput[]
    OR?: CreatorVideoViewScalarWhereInput[]
    NOT?: CreatorVideoViewScalarWhereInput | CreatorVideoViewScalarWhereInput[]
    id?: StringFilter<"CreatorVideoView"> | string
    creatorVideoId?: StringFilter<"CreatorVideoView"> | string
    viewerProfileId?: StringNullableFilter<"CreatorVideoView"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoView"> | Date | string
  }

  export type CreatorVideoLikeUpsertWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoLikeWhereUniqueInput
    update: XOR<CreatorVideoLikeUpdateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedUpdateWithoutCreatorVideoInput>
    create: XOR<CreatorVideoLikeCreateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoLikeUpdateWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoLikeWhereUniqueInput
    data: XOR<CreatorVideoLikeUpdateWithoutCreatorVideoInput, CreatorVideoLikeUncheckedUpdateWithoutCreatorVideoInput>
  }

  export type CreatorVideoLikeUpdateManyWithWhereWithoutCreatorVideoInput = {
    where: CreatorVideoLikeScalarWhereInput
    data: XOR<CreatorVideoLikeUpdateManyMutationInput, CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoInput>
  }

  export type CreatorVideoLikeScalarWhereInput = {
    AND?: CreatorVideoLikeScalarWhereInput | CreatorVideoLikeScalarWhereInput[]
    OR?: CreatorVideoLikeScalarWhereInput[]
    NOT?: CreatorVideoLikeScalarWhereInput | CreatorVideoLikeScalarWhereInput[]
    id?: StringFilter<"CreatorVideoLike"> | string
    creatorVideoId?: StringFilter<"CreatorVideoLike"> | string
    likerProfileId?: StringNullableFilter<"CreatorVideoLike"> | string | null
    createdAt?: DateTimeFilter<"CreatorVideoLike"> | Date | string
  }

  export type CreatorVideoCommentUpsertWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoCommentWhereUniqueInput
    update: XOR<CreatorVideoCommentUpdateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedUpdateWithoutCreatorVideoInput>
    create: XOR<CreatorVideoCommentCreateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedCreateWithoutCreatorVideoInput>
  }

  export type CreatorVideoCommentUpdateWithWhereUniqueWithoutCreatorVideoInput = {
    where: CreatorVideoCommentWhereUniqueInput
    data: XOR<CreatorVideoCommentUpdateWithoutCreatorVideoInput, CreatorVideoCommentUncheckedUpdateWithoutCreatorVideoInput>
  }

  export type CreatorVideoCommentUpdateManyWithWhereWithoutCreatorVideoInput = {
    where: CreatorVideoCommentScalarWhereInput
    data: XOR<CreatorVideoCommentUpdateManyMutationInput, CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoInput>
  }

  export type CreatorVideoCommentScalarWhereInput = {
    AND?: CreatorVideoCommentScalarWhereInput | CreatorVideoCommentScalarWhereInput[]
    OR?: CreatorVideoCommentScalarWhereInput[]
    NOT?: CreatorVideoCommentScalarWhereInput | CreatorVideoCommentScalarWhereInput[]
    id?: StringFilter<"CreatorVideoComment"> | string
    creatorVideoId?: StringFilter<"CreatorVideoComment"> | string
    commenterProfileId?: StringNullableFilter<"CreatorVideoComment"> | string | null
    content?: StringFilter<"CreatorVideoComment"> | string
    createdAt?: DateTimeFilter<"CreatorVideoComment"> | Date | string
  }

  export type CreatorVideoCreateWithoutViewsInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutVideosInput
    folder: CreatorVideoFolderCreateNestedOneWithoutVideosInput
    likes?: CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateWithoutViewsInput = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoCreateOrConnectWithoutViewsInput = {
    where: CreatorVideoWhereUniqueInput
    create: XOR<CreatorVideoCreateWithoutViewsInput, CreatorVideoUncheckedCreateWithoutViewsInput>
  }

  export type CreatorVideoUpsertWithoutViewsInput = {
    update: XOR<CreatorVideoUpdateWithoutViewsInput, CreatorVideoUncheckedUpdateWithoutViewsInput>
    create: XOR<CreatorVideoCreateWithoutViewsInput, CreatorVideoUncheckedCreateWithoutViewsInput>
    where?: CreatorVideoWhereInput
  }

  export type CreatorVideoUpdateToOneWithWhereWithoutViewsInput = {
    where?: CreatorVideoWhereInput
    data: XOR<CreatorVideoUpdateWithoutViewsInput, CreatorVideoUncheckedUpdateWithoutViewsInput>
  }

  export type CreatorVideoUpdateWithoutViewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutVideosNestedInput
    folder?: CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput
    likes?: CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateWithoutViewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoCreateWithoutLikesInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutVideosInput
    folder: CreatorVideoFolderCreateNestedOneWithoutVideosInput
    views?: CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateWithoutLikesInput = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    views?: CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput
    comments?: CreatorVideoCommentUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoCreateOrConnectWithoutLikesInput = {
    where: CreatorVideoWhereUniqueInput
    create: XOR<CreatorVideoCreateWithoutLikesInput, CreatorVideoUncheckedCreateWithoutLikesInput>
  }

  export type CreatorVideoUpsertWithoutLikesInput = {
    update: XOR<CreatorVideoUpdateWithoutLikesInput, CreatorVideoUncheckedUpdateWithoutLikesInput>
    create: XOR<CreatorVideoCreateWithoutLikesInput, CreatorVideoUncheckedCreateWithoutLikesInput>
    where?: CreatorVideoWhereInput
  }

  export type CreatorVideoUpdateToOneWithWhereWithoutLikesInput = {
    where?: CreatorVideoWhereInput
    data: XOR<CreatorVideoUpdateWithoutLikesInput, CreatorVideoUncheckedUpdateWithoutLikesInput>
  }

  export type CreatorVideoUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutVideosNestedInput
    folder?: CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput
    views?: CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    views?: CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoCreateWithoutCommentsInput = {
    id: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: CreatorCreateNestedOneWithoutVideosInput
    folder: CreatorVideoFolderCreateNestedOneWithoutVideosInput
    views?: CreatorVideoViewCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoUncheckedCreateWithoutCommentsInput = {
    id: string
    creatorId: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    views?: CreatorVideoViewUncheckedCreateNestedManyWithoutCreatorVideoInput
    likes?: CreatorVideoLikeUncheckedCreateNestedManyWithoutCreatorVideoInput
  }

  export type CreatorVideoCreateOrConnectWithoutCommentsInput = {
    where: CreatorVideoWhereUniqueInput
    create: XOR<CreatorVideoCreateWithoutCommentsInput, CreatorVideoUncheckedCreateWithoutCommentsInput>
  }

  export type CreatorVideoUpsertWithoutCommentsInput = {
    update: XOR<CreatorVideoUpdateWithoutCommentsInput, CreatorVideoUncheckedUpdateWithoutCommentsInput>
    create: XOR<CreatorVideoCreateWithoutCommentsInput, CreatorVideoUncheckedCreateWithoutCommentsInput>
    where?: CreatorVideoWhereInput
  }

  export type CreatorVideoUpdateToOneWithWhereWithoutCommentsInput = {
    where?: CreatorVideoWhereInput
    data: XOR<CreatorVideoUpdateWithoutCommentsInput, CreatorVideoUncheckedUpdateWithoutCommentsInput>
  }

  export type CreatorVideoUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutVideosNestedInput
    folder?: CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput
    views?: CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    views?: CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type ProfileCreateWithoutSessionInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorCreateNestedOneWithoutProfileInput
    credential?: AuthCredentialCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutSessionInput = {
    id: string
    email: string
    role?: $Enums.Role
    fullName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    addressFull?: string | null
    addressLat?: number | null
    addressLon?: number | null
    addressType?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressName?: string | null
    age?: number | null
    sex?: string | null
    emailVerified?: boolean
    hasPassword?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: CreatorUncheckedCreateNestedOneWithoutProfileInput
    credential?: AuthCredentialUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutSessionInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSessionInput, ProfileUncheckedCreateWithoutSessionInput>
  }

  export type ProfileUpsertWithoutSessionInput = {
    update: XOR<ProfileUpdateWithoutSessionInput, ProfileUncheckedUpdateWithoutSessionInput>
    create: XOR<ProfileCreateWithoutSessionInput, ProfileUncheckedCreateWithoutSessionInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutSessionInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutSessionInput, ProfileUncheckedUpdateWithoutSessionInput>
  }

  export type ProfileUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneWithoutProfileNestedInput
    credential?: AuthCredentialUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    addressFull?: NullableStringFieldUpdateOperationsInput | string | null
    addressLat?: NullableFloatFieldUpdateOperationsInput | number | null
    addressLon?: NullableFloatFieldUpdateOperationsInput | number | null
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    addressCountry?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUncheckedUpdateOneWithoutProfileNestedInput
    credential?: AuthCredentialUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type SessionCreateManyProfileInput = {
    id: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCreateManyCreatorInput = {
    id: string
    folderId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoFolderCreateManyCreatorInput = {
    id: string
    title: string
    folderType: string
    status?: string
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folder?: CreatorVideoFolderUpdateOneRequiredWithoutVideosNestedInput
    views?: CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    views?: CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoFolderUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUpdateManyWithoutFolderNestedInput
  }

  export type CreatorVideoFolderUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: CreatorVideoUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type CreatorVideoFolderUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    folderType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCreateManyFolderInput = {
    id: string
    creatorId: string
    title: string
    description?: string | null
    category?: string | null
    videoUrl?: string | null
    videoFileId?: string | null
    thumbnailUrl?: string | null
    thumbnailFileId?: string | null
    isPrivate?: boolean
    isPremium?: boolean
    monetizationType?: string
    status?: string
    publishNow?: boolean
    scheduledAt?: Date | string | null
    rent24Price?: number | null
    rent48Price?: number | null
    purchasePrice?: number | null
    tags?: CreatorVideoCreatetagsInput | string[]
    packageName?: string | null
    episodeIndex?: number | null
    duration?: string | null
    allowComments?: boolean
    ageRestriction?: boolean
    viewsCount?: number
    likesCount?: number
    commentsCount?: number
    revenue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorVideoUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: CreatorUpdateOneRequiredWithoutVideosNestedInput
    views?: CreatorVideoViewUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    views?: CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoNestedInput
    likes?: CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoNestedInput
    comments?: CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoNestedInput
  }

  export type CreatorVideoUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoFileId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    monetizationType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishNow?: BoolFieldUpdateOperationsInput | boolean
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent24Price?: NullableIntFieldUpdateOperationsInput | number | null
    rent48Price?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: CreatorVideoUpdatetagsInput | string[]
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    episodeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    ageRestriction?: BoolFieldUpdateOperationsInput | boolean
    viewsCount?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    commentsCount?: IntFieldUpdateOperationsInput | number
    revenue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewCreateManyCreatorVideoInput = {
    id: string
    viewerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoLikeCreateManyCreatorVideoInput = {
    id: string
    likerProfileId?: string | null
    createdAt?: Date | string
  }

  export type CreatorVideoCommentCreateManyCreatorVideoInput = {
    id: string
    commenterProfileId?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CreatorVideoViewUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewUncheckedUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoViewUncheckedUpdateManyWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeUncheckedUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoLikeUncheckedUpdateManyWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    likerProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentUncheckedUpdateWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorVideoCommentUncheckedUpdateManyWithoutCreatorVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    commenterProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}