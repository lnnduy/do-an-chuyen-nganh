using Server.Entities;

namespace Server.Model.Response
{
  public class ThongTinTaiKhoan
  {
    public long Id { get; set; }
    public string Username { get; set; }
    public string HoTen { get; set; }
    public string Email { get; set; }
    public string SoDienThoai { get; set; }
    public string GioiTinh { get; set; }
    public string QuyenTruyCap { get; set; }

    public ThongTinTaiKhoan(TaiKhoan taiKhoan)
    {
      Id = taiKhoan.Id;
      Username = taiKhoan.Username;
      HoTen = taiKhoan.HoTen;
      Email = taiKhoan.Email;
      SoDienThoai = taiKhoan.SoDienThoai;
      GioiTinh = taiKhoan.GioiTinh;
      QuyenTruyCap = taiKhoan.QuyenTruyCap;
    }
  }
}