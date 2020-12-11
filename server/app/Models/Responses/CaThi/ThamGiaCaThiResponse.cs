using Server.Entity;

namespace Server.Model.Response
{
  public class ThamGiaCaThiResponse
  {
    public long Id { get; set; }
    public string TenCaThi { get; set; }
    public long ThoiGianBatDau { get; set; }
    public long ThoiGianThi { get; set; }
    public string TrangThai { get; set; }
    public string TrangThaiThi { get; set; }

    public ThamGiaCaThiResponse(CaThi caThi, ThiSinh thiSinh)
    {
      Id = caThi.Id;
      TenCaThi = caThi.TenCaThi;
      ThoiGianBatDau = caThi.ThoiGianBatDau;
      ThoiGianThi = caThi.ThoiGianThi;
      TrangThai = caThi.TrangThai;
      TrangThaiThi = thiSinh.TrangThaiThi;
    }
  }
}