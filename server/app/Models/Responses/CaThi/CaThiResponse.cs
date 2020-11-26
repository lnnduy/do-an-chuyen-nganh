using Server.Entity;

namespace Server.Model.Response
{
  public class CaThiResponse
  {
    public long Id { get; set; }
    public long IdHocPhan { get; set; }
    public string TenCaThi { get; set; }
    public long ThoiGianBatDau { get; set; }
    public long ThoiGianThi { get; set; }
    public string TrangThai { get; set; }
    public string MaBaoVe { get; set; }
    public LopHoc LopHoc { get; set; }
    public DeThiResponse DeThi { get; set; }
    public ThongTinTaiKhoan GiamThi { get; set; }

    public CaThiResponse(CaThi caThi, LopHoc lopHoc, DeThiResponse deThi, TaiKhoan giamThi)
    {
      Id = caThi.Id;
      IdHocPhan = caThi.IdHocPhan;
      TenCaThi = caThi.TenCaThi;
      ThoiGianBatDau = caThi.ThoiGianBatDau;
      ThoiGianThi = caThi.ThoiGianThi;
      TrangThai = caThi.TrangThai;
      MaBaoVe = caThi.MaBaoVe;

      LopHoc = lopHoc;
      DeThi = deThi;
      if (giamThi != null) GiamThi = new ThongTinTaiKhoan(giamThi);
    }
  }
}