using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
  [Table("TaiKhoan")]
  public class TaiKhoan
  {
    [Key]
    public long Id { get; set; }
    public string Username { get; set; }
    public string MatKhau { get; set; }
    public string HoTen { get; set; }
    public string Email { get; set; }
    public string SoDienThoai { get; set; }
    public string GioiTinh { get; set; }
  }
}