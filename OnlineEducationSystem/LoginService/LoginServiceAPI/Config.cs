// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;

namespace LoginServiceAPI
{
    public static class Config
    {
        public static List<TestUser> Users
        {
            get
            {
                var address = new
                {
                    street_address = "One Hacker Way",
                    locality = "Heidelberg",
                    postal_code = 69118,
                    country = "Germany"
                };

                return new List<TestUser>
                {
                    new TestUser
                    {
                        SubjectId = "818727",
                        Username = "alice",
                        Password = "alice",
                        Claims =
                        {
                            new Claim(JwtClaimTypes.Name, "Alice Smith"),
                            new Claim(JwtClaimTypes.GivenName, "Alice"),
                            new Claim(JwtClaimTypes.FamilyName, "Smith"),
                            new Claim(JwtClaimTypes.Email, "AliceSmith@email.com"),
                            new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, "admin"),
                            new Claim(JwtClaimTypes.WebSite, "http://alice.com"),
                            new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                IdentityServerConstants.ClaimValueTypes.Json)
                        }
                    },
                    new TestUser
                    {
                        SubjectId = "88421113",
                        Username = "bob",
                        Password = "bob",
                        Claims =
                        {
                            new Claim(JwtClaimTypes.Name, "Bob Smith"),
                            new Claim(JwtClaimTypes.GivenName, "Bob"),
                            new Claim(JwtClaimTypes.FamilyName, "Smith"),
                            new Claim(JwtClaimTypes.Email, "BobSmith@email.com"),
                            new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.Role, "user"),
                            new Claim(JwtClaimTypes.WebSite, "http://bob.com"),
                            new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                IdentityServerConstants.ClaimValueTypes.Json)
                        }
                    }
                };
            }
        }

        public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            //can send some user related info in claims for readonly operations
            //but is not a good idea as the jwt can be read by everybodyy
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
            new IdentityResource
            {
                Name = "role",
                UserClaims = new List<string> {"role"},
                DisplayName = "The type of user for OnlineEducationSystem"
            }
        };

        public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("ClassroomServiceAPI.student"),
            new ApiScope("ClassroomServiceAPI.teacher"),
            new ApiScope("ClassroomServiceAPI.admin"),
            new ApiScope("UserServiceAPI.student"),
            new ApiScope("UserServiceAPI.teacher"),
            new ApiScope("UserServiceAPI.admin"),
        };
        public static IEnumerable<ApiResource> ApiResources => new[]
        {
            new ApiResource("ClassroomServiceAPI")
            {
                Scopes = new List<string> { "ClassroomServiceAPI.student", "ClassroomServiceAPI.teacher", "ClassroomServiceAPI.admin", 
                                        "UserServiceAPI.student", "UserServiceAPI.teacher"},
                ApiSecrets = new List<Secret> {new Secret("ScopeSecret".Sha256())},
                UserClaims = new List<string> { IdentityServerConstants.StandardScopes.OpenId, "role"}
            },
            new ApiResource("UserServiceAPI")
            {
                Scopes = new List<string> { "UserServiceAPI.student", "UserServiceAPI.teacher", "UserServiceAPI.admin"},
                ApiSecrets = new List<Secret>{ new Secret("ScopeSecret".Sha256()) },
                UserClaims = new List<string> { IdentityServerConstants.StandardScopes.OpenId,"role" }
            },
        };

        public static IEnumerable<Client> Clients =>
        new Client[]
        {
            //todo: Add our web application here
            new Client
            {
                ClientId = "OES.WebAPP",
                ClientName = "Online Education System WEB",
                ClientSecrets = { new Secret("secret".Sha256()) },

                //Client uris
                // the client has already setup these endpoints due to the openidc middleware
                RedirectUris =           { "https://localhost:5002/signin-oidc" },
                PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" }, // logout at identity provider, also triggers log out at webapp
                FrontChannelLogoutUri =    "https://localhost:5002/signout-oidc", //log out at web app, and destory client cookie

                AllowedGrantTypes = GrantTypes.Code,
                //RequirePkce = true, //must be enabled at client side as well
                AllowedScopes = {
                                    //Doubtful about this, might remove later ???
                                    IdentityServerConstants.StandardScopes.OpenId,
                                    IdentityServerConstants.StandardScopes.Profile,
                                    IdentityServerConstants.StandardScopes.Email,
                                    "role",

                                    "ClassroomServiceAPI.student", 
                                    "ClassroomServiceAPI.teacher",
                                    "ClassroomServiceAPI.admin",
                                    "UserServiceAPI.student",
                                    "UserServiceAPI.teacher",
                                    "UserServiceAPI.admin"}

            },

            //todo: Add our ClaassroomService as a client here
            //not for getting the identifying the users but for the
            //referential integrity cleanup tasks
            new Client
            {
                ClientId = "OES.ClassroomServiceAPI",
                ClientName = "Online Education System ClassroomServiceAPI",
                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = {   IdentityServerConstants.StandardScopes.OpenId,
                                    IdentityServerConstants.StandardScopes.Profile,
                                    IdentityServerConstants.StandardScopes.Email,
                                    "role",

                                    "UserServiceAPI.student",
                                    "UserServiceAPI.teacher",
                                    "UserServiceAPI.admin"}
            },

            //todo: Add our UserService as a client here
            //for referential integrity cleanup tasks
            new Client
            {
                ClientId = "OES.UserServiceAPI",
                ClientName = "Online Education System UserServiceAPI",
                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = {   IdentityServerConstants.StandardScopes.OpenId,
                                    IdentityServerConstants.StandardScopes.Profile,
                                    IdentityServerConstants.StandardScopes.Email,
                                    "role",
                    
                                    "ClassroomServiceAPI.student",
                                    "ClassroomServiceAPI.teacher",
                                    "ClassroomServiceAPI.admin"}
            },

            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "interactive",
                ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,

                RedirectUris = { "https://localhost:44300/signin-oidc" },
                FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
                PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "ClassroomServiceAPI.student", "ClassroomServiceAPI.teacher", "ClassroomServiceAPI.admin"},
                RequirePkce = true,
                RequireConsent = true,
                AllowPlainTextPkce = false
            },

            // m2m client credentials flow client
            new Client
            {
                ClientId = "m2m.client",
                ClientName = "Client Credentials Client",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedScopes = { "ClassroomServiceAPI.student", "ClassroomServiceAPI.teacher", "ClassroomServiceAPI.admin"}
            },

            
        };
    }
}