using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Server.Entity
{
  public class ServerContext : DbContext
  {
    private readonly ILoggerFactory _logger = LoggerFactory.Create(builder => builder.AddConsole());

    public DbSet<TaiKhoan> TaiKhoanContext { get; set; }
    public DbSet<HocPhan> HocPhanContext { get; set; }
    public DbSet<LopHoc> LopHocContext { get; set; }
    public DbSet<SinhVien> SinhVienContext { get; set; }
    public DbSet<KhoCauHoi> KhoCauHoiContext { get; set; }
    public DbSet<CauHoi> CauHoiContext { get; set; }
    public DbSet<DapAn> DapAnContext { get; set; }
    public DbSet<DeThi> DeThiContext { get; set; }
    public DbSet<ChiTietDeThi> ChiTietDeThiContext { get; set; }

    public ServerContext() : base()
    { }

    public ServerContext(DbContextOptions options) : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
      options.UseLoggerFactory(_logger)
        .UseSqlServer(@"Server=.\SQLEXPRESS;Database=DoAnChuyenNganh;Trusted_Connection=true")
        .EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Entity<SinhVien>()
        .HasOne(sv => sv.LopHoc)
        .WithMany(lh => lh.DsSinhVien)
        .HasForeignKey(sv => sv.IdLopHoc)
        .HasConstraintName("FK_LopHoc_SinhVien");

      builder.Entity<KhoCauHoi>()
        .HasOne(kch => kch.HocPhan)
        .WithMany(hp => hp.DsKhoCauHoi)
        .HasForeignKey(kch => kch.IdHocPhan)
        .HasConstraintName("FK_HocPhan_KhoCauHoi");

      builder.Entity<CauHoi>()
        .HasOne(ch => ch.KhoCauHoi)
        .WithMany(kch => kch.DsCauHoi)
        .HasForeignKey(ch => ch.IdKhoCauHoi)
        .HasConstraintName("FK_KhoCauHoi_CauHoi");

      builder.Entity<DeThi>()
        .HasOne(dt => dt.HocPhan)
        .WithMany(hp => hp.DsDeThi)
        .HasForeignKey(dt => dt.IdHocPhan)
        .HasConstraintName("FK_HocPhan_DeThi");

      builder.Entity<DapAn>()
        .HasOne(da => da.CauHoi)
        .WithMany(ch => ch.DsDapAn)
        .HasForeignKey(da => da.IdCauHoi)
        .HasConstraintName("FK_CauHoi_DapAn");

      builder.Entity<ChiTietDeThi>()
        .HasKey(ctdt => new { ctdt.IdDeThi, ctdt.IdCauHoi });

      builder.Entity<ChiTietDeThi>()
        .HasOne(ctdt => ctdt.DeThi)
        .WithMany(dt => dt.DsCauHoi)
        .HasForeignKey(ctdt => ctdt.IdDeThi)
        .HasConstraintName("FK_DeThi_ChiTietDeThi")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<ChiTietDeThi>()
        .HasOne(ctdt => ctdt.CauHoi)
        .WithMany(ch => ch.DsDeThi)
        .HasForeignKey(ctdt => ctdt.IdCauHoi)
        .HasConstraintName("FK_CauHoi_ChiTietDeThi")
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}