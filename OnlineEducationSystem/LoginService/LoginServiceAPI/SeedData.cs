// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.EntityFramework.Storage;
using LoginServiceAPI.Data;
using LoginServiceAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;
using System.Linq;
using System.Security.Claims;

namespace LoginServiceAPI
{
    public class SeedData
    {
        public static void EnsureSeedData(string connectionString)
        {
            System.Console.WriteLine($"\n\n\n\nCONNECTION STRING IN ENSURESEEDDATA IS:{connectionString}");
            var services = new ServiceCollection();
            services.AddLogging();
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(connectionString));

            services.AddIdentity<OnlineEducationSystemUser, OnlineEducationSystemUserRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddOperationalDbContext(options =>
            {
                options.ConfigureDbContext = db =>
                  db.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(typeof(SeedData).Assembly.FullName));
            });
            services.AddConfigurationDbContext(options =>
            {
                options.ConfigureDbContext = db =>
                  db.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(typeof(SeedData).Assembly.FullName));
            });

            using (var serviceProvider = services.BuildServiceProvider())
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();

                    var context = scope.ServiceProvider.GetService<ConfigurationDbContext>();
                    context.Database.Migrate();

                    EnsureSeedData(context);

                    var ctx = scope.ServiceProvider.GetService<ApplicationDbContext>();
                    ctx.Database.Migrate();
                    EnsureUsers(scope);

                    //var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<OnlineEducationSystemUser>>();
                    //var alice = userMgr.FindByNameAsync("alice").Result;
                    //if (alice == null)
                    //{
                    //    alice = new OnlineEducationSystemUser
                    //    {
                    //        UserName = "alice",
                    //        Email = "AliceSmith@email.com",
                    //        EmailConfirmed = true,
                    //    };
                    //    var result = userMgr.CreateAsync(alice, "Pass123$").Result;
                    //    if (!result.Succeeded)
                    //    {
                    //        throw new Exception(result.Errors.First().Description);
                    //    }

                    //    result = userMgr.AddClaimsAsync(alice, new Claim[]{
                    //        new Claim(JwtClaimTypes.Name, "Alice Smith"),
                    //        new Claim(JwtClaimTypes.GivenName, "Alice"),
                    //        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                    //        new Claim(JwtClaimTypes.WebSite, "http://alice.com"),
                    //    }).Result;
                    //    if (!result.Succeeded)
                    //    {
                    //        throw new Exception(result.Errors.First().Description);
                    //    }
                    //    Log.Debug("alice created");
                    //}
                    //else
                    //{
                    //    Log.Debug("alice already exists");
                    //}

                    //var bob = userMgr.FindByNameAsync("bob").Result;
                    //if (bob == null)
                    //{
                    //    bob = new OnlineEducationSystemUser
                    //    {
                    //        UserName = "bob",
                    //        Email = "BobSmith@email.com",
                    //        EmailConfirmed = true
                    //    };
                    //    var result = userMgr.CreateAsync(bob, "Pass123$").Result;
                    //    if (!result.Succeeded)
                    //    {
                    //        throw new Exception(result.Errors.First().Description);
                    //    }

                    //    result = userMgr.AddClaimsAsync(bob, new Claim[]{
                    //        new Claim(JwtClaimTypes.Name, "Bob Smith"),
                    //        new Claim(JwtClaimTypes.GivenName, "Bob"),
                    //        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                    //        new Claim(JwtClaimTypes.WebSite, "http://bob.com"),
                    //        new Claim("location", "somewhere")
                    //    }).Result;
                    //    if (!result.Succeeded)
                    //    {
                    //        throw new Exception(result.Errors.First().Description);
                    //    }
                    //    Log.Debug("bob created");
                    //}
                    //else
                    //{
                    //    Log.Debug("bob already exists");
                    //}
                }
            }
        }

        private static void EnsureUsers(IServiceScope scope)
        {
            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<OnlineEducationSystemUser>>();
            var alice = userMgr.FindByNameAsync("alice").Result;
            if (alice == null)
            {
                alice = new OnlineEducationSystemUser
                {
                    UserName = "alice",
                    Email = "AliceSmith@email.com",
                    FirstName = "Alice",
                    LastName = "Smith",
                    Gender = "Female",
                    PhoneNumber = "12345678",
                };
                var result = userMgr.CreateAsync(alice, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(alice, new Claim[]
                {
          new Claim(JwtClaimTypes.Name, "Alice Smith"),
          new Claim(JwtClaimTypes.GivenName, "Alice"),
          new Claim(JwtClaimTypes.FamilyName, "Smith"),
          new Claim(JwtClaimTypes.Role, "teacher"),
                }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("alice created");
            }
            else
            {
                Log.Debug("alice already exists");
            }

            var bob = userMgr.FindByNameAsync("bob").Result;
            if (bob == null)
            {
                bob = new OnlineEducationSystemUser
                {
                    PhoneNumber = "12345678",
                    UserName = "bob",
                    Email = "BobSmith@email.com",
                    EmailConfirmed = true,
                    FirstName = "Bob",
                    LastName = "Smith",
                    Gender = "Male",
                    RollNo = 21,
                    IsApproved = true
                };
                var result = userMgr.CreateAsync(bob, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(bob, new Claim[]
                {
          new Claim(JwtClaimTypes.Name, $"{bob.FirstName} {bob.LastName}"),
          new Claim(JwtClaimTypes.GivenName, $"{bob.FirstName}"),
          new Claim(JwtClaimTypes.FamilyName, $"{bob.LastName}"),
          new Claim(JwtClaimTypes.Role, "student"),
          new Claim("location", "Mumbai")
                }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("bob created");
            }
            else
            {
                Log.Debug("bob already exists");
            }
        }

        private static void EnsureSeedData(ConfigurationDbContext context)
        {
            if (!context.Clients.Any())
            {
                Log.Debug("Clients being populated");
                foreach (var client in Config.Clients.ToList())
                {
                    context.Clients.Add(client.ToEntity());
                }

                context.SaveChanges();
            }
            else
            {
                Log.Debug("Clients already populated");
            }

            if (!context.IdentityResources.Any())
            {
                Log.Debug("IdentityResources being populated");
                foreach (var resource in Config.IdentityResources.ToList())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
            else
            {
                Log.Debug("IdentityResources already populated");
            }

            if (!context.ApiScopes.Any())
            {
                Log.Debug("ApiScopes being populated");
                foreach (var resource in Config.ApiScopes.ToList())
                {
                    context.ApiScopes.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
            else
            {
                Log.Debug("ApiScopes already populated");
            }

            if (!context.ApiResources.Any())
            {
                Log.Debug("ApiResources being populated");
                foreach (var resource in Config.ApiResources.ToList())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
            else
            {
                Log.Debug("ApiScopes already populated");
            }
        }

    }
}
