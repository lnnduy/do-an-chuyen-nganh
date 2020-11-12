﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Entity;

namespace server.Migrations
{
    [DbContext(typeof(ServerContext))]
    [Migration("20201112070928_EditTableName_KhoCauHoiContext_KhoCauHoi")]
    partial class EditTableName_KhoCauHoiContext_KhoCauHoi
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Server.Entity.HocPhan", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TenHocPhan")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("HocPhan");
                });

            modelBuilder.Entity("Server.Entity.KhoCauHoi", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("IdHocPhan")
                        .HasColumnType("bigint");

                    b.Property<string>("MoTa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenKhoCauHoi")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdHocPhan");

                    b.ToTable("KhoCauHoi");
                });

            modelBuilder.Entity("Server.Entity.LopHoc", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TenLop")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LopHoc");
                });

            modelBuilder.Entity("Server.Entity.SinhVien", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GioiTinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("IdLopHoc")
                        .HasColumnType("bigint");

                    b.Property<string>("MSSV")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoDienThoai")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdLopHoc");

                    b.ToTable("SinhVien");
                });

            modelBuilder.Entity("Server.Entity.TaiKhoan", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GioiTinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MatKhau")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuyenTruyCap")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoDienThoai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TaiKhoan");
                });

            modelBuilder.Entity("Server.Entity.KhoCauHoi", b =>
                {
                    b.HasOne("Server.Entity.HocPhan", "HocPhan")
                        .WithMany("DsKhoCauHoi")
                        .HasForeignKey("IdHocPhan")
                        .HasConstraintName("FK_HocPhan_KhoCauHoi")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Entity.SinhVien", b =>
                {
                    b.HasOne("Server.Entity.LopHoc", "LopHoc")
                        .WithMany("DsSinhVien")
                        .HasForeignKey("IdLopHoc")
                        .HasConstraintName("FK_LopHoc_SinhVien")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
