using Server.Entities;

namespace Server.Model.Response
{
  public class AuthResponse
  {
    public long Id { get; set; }
    public string Username { get; set; }
    public string HoTen { get; set; }
    public string Email { get; set; }
    public string SoDienThoai { get; set; }
    public string GioiTinh { get; set; }
    public string QuyenTruyCap { get; set; }
    public string Token { get; set; }

    public AuthResponse(string token, TaiKhoan taiKhoan)
    {
      Token = token;
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