using LoginServiceAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LoginServiceAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<OnlineEducationSystemUser, OnlineEducationSystemUserRole, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<OnlineEducationSystemUser>()
                .Property(u => u.Id)
                .UseIdentityColumn(); //will this work for guids ????

            builder.Entity<OnlineEducationSystemUser>()
                .Property(u => u.IsApproved)
                .HasDefaultValue(false);

            builder.Entity<OnlineEducationSystemUser>()
                .Property(u => u.IsDeleted)
                .HasDefaultValue(false);

            //builder.Entity<OnlineEducationSystemUser>(entity =>
            //{
            //    //entity.ToTable(name: "AspNetUser");
            //    entity.Property(e => e.Id).HasColumnName("AspNetUserId");
            //});

            //builder.Entity<IdentityRole<int>>(entity =>
            //{
            //    //entity.ToTable(name: "AspNetRole");
            //    entity.Property(e => e.Id).HasColumnName("AspNetRoleId");

            //});

            //builder.Entity<IdentityUserClaim<int>>(entity =>
            //{
            //    entity.ToTable("AspNetUserClaim");
            //    entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
            //    entity.Property(e => e.Id).HasColumnName("AspNetUserClaimId");

            //});

            //builder.Entity<IdentityUserLogin<int>>(entity =>
            //{
            //    entity.ToTable("AspNetUserLogin");
            //    entity.Property(e => e.UserId).HasColumnName("AspNetUserId");

            //});

            //builder.Entity<IdentityRoleClaim<int>>(entity =>
            //{
            //    entity.ToTable("AspNetRoleClaim");
            //    entity.Property(e => e.Id).HasColumnName("AspNetRoleClaimId");
            //    entity.Property(e => e.RoleId).HasColumnName("AspNetRoleId");
            //});

            //builder.Entity<IdentityUserRole<int>>(entity =>
            //{
            //    entity.ToTable("AspNetUserRole");
            //    entity.Property(e => e.UserId).HasColumnName("AspNetUserId");
            //    entity.Property(e => e.RoleId).HasColumnName("AspNetRoleId");

            //});


            //builder.Entity<IdentityUserToken<int>>(entity =>
            //{
            //    entity.ToTable("AspNetUserToken");
            //    entity.Property(e => e.UserId).HasColumnName("AspNetUserId");

            //});

            //builder.Entity<OnlineEducationSystemUserRole>(entity =>
            //{
            //    entity.ToTable(name: "AspNetRole");
            //    entity.Property(e => e.Id).HasColumnName("AspNetRoleId");

            //});









            //builder.Entity<OnlineEducationSystemUser>()
            //    .HasData(
            //    new OnlineEducationSystemUser()
            //    {

            //    }
            //    );

        }
    }
}
