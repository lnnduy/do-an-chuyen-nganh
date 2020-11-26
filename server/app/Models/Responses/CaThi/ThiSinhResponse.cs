using Server.Entity;

namespace Server.Model.Response
{
  public class ThiSinhResponse
  {
    public long Id { get; set; }
    public string HoTen { get; set; }
    public string MSSV { get; set; }
    public string TenMay { get; set; }
    public int SoLanDangNhap { get; set; }
    public string DiaChiIp { get; set; }

    public ThiSinhResponse(SinhVien sinhVien, ThiSinh thiSinh)
    {
      Id = sinhVien.Id;
      HoTen = sinhVien.HoTen;
      MSSV = sinhVien.MSSV;
      TenMay = thiSinh.TenMay;
      SoLanDangNhap = thiSinh.SoLanDangNhap;
      DiaChiIp = thiSinh.DiaChiIp;
    }
  }
}