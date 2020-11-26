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
    public DbSet<CaThi> CaThiContext { get; set; }
    public DbSet<ThiSinh> ThiSinhContext { get; set; }
    public DbSet<BaiLam> BaiLamContext { get; set; }

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


      builder.Entity<CaThi>()
        .HasOne(ct => ct.HocPhan)
        .WithMany(hp => hp.DsCaThi)
        .HasForeignKey(ct => ct.IdHocPhan)
        .HasConstraintName("FK_HocPhan_CaThi")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<CaThi>()
        .HasOne(ct => ct.LopHoc)
        .WithMany(lh => lh.DsCaThi)
        .HasForeignKey(ct => ct.IdLopHoc)
        .HasConstraintName("FK_LopHoc_CaThi")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<CaThi>()
        .HasOne(ct => ct.GiamThi)
        .WithMany(gt => gt.DsCaThi)
        .HasForeignKey(ct => ct.IdGiamThi)
        .HasConstraintName("FK_GiamThi_CaThi")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<CaThi>()
        .HasOne(ct => ct.DeThi)
        .WithMany(dt => dt.DsCaThi)
        .HasForeignKey(ct => ct.IdDeThi)
        .HasConstraintName("FK_DeThi_CaThi")
        .OnDelete(DeleteBehavior.NoAction);


      builder.Entity<ThiSinh>()
        .HasKey(ts => new { ts.IdSinhVien, ts.IdCaThi });

      builder.Entity<ThiSinh>()
        .HasOne(ts => ts.SinhVien)
        .WithMany(sv => sv.DsCaThi)
        .HasForeignKey(ts => ts.IdSinhVien)
        .HasConstraintName("FK_SinhVien_ThiSinh")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<ThiSinh>()
        .HasOne(ts => ts.CaThi)
        .WithMany(ct => ct.DsThiSinh)
        .HasForeignKey(ts => ts.IdCaThi)
        .HasConstraintName("FK_CaThi_ThiSinh")
        .OnDelete(DeleteBehavior.NoAction);


      builder.Entity<BaiLam>()
        .HasKey(bl => new { bl.IdCaThi, bl.IdSinhVien, bl.IdCauHoi, bl.IdDapAn });

      builder.Entity<BaiLam>()
        .HasOne(ts => ts.CaThi)
        .WithMany(ct => ct.DsBaiLam)
        .HasForeignKey(ts => ts.IdCaThi)
        .HasConstraintName("FK_CaThi_BaiLam")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<BaiLam>()
        .HasOne(ts => ts.SinhVien)
        .WithMany(ct => ct.DsBaiLam)
        .HasForeignKey(ts => ts.IdSinhVien)
        .HasConstraintName("FK_SinhVien_BaiLam")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<BaiLam>()
        .HasOne(ts => ts.CauHoi)
        .WithMany(ct => ct.DsBaiLam)
        .HasForeignKey(ts => ts.IdCauHoi)
        .HasConstraintName("FK_CauHoi_BaiLam")
        .OnDelete(DeleteBehavior.NoAction);

      builder.Entity<BaiLam>()
        .HasOne(ts => ts.DapAn)
        .WithMany(ct => ct.DsBaiLam)
        .HasForeignKey(ts => ts.IdDapAn)
        .HasConstraintName("FK_DapAn_BaiLam")
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}