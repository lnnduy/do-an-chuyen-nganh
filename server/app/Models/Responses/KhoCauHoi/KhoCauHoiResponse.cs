using System.Linq;
using Server.Entity;
using Server.Enum;

namespace Server.Model.Response
{
  public class KhoCauHoiResponse
  {
    public long Id { get; set; }
    public long IdHocPhan { get; set; }
    public string TenKhoCauHoi { get; set; }
    public string MoTa { get; set; }
    public int SoLuongCauHoiDe { get; set; }
    public int SoLuongCauHoiTrungBinh { get; set; }
    public int SoLuongCauHoiKho { get; set; }

    public KhoCauHoiResponse(KhoCauHoi khoCauHoi)
    {
      Id = khoCauHoi.Id;
      IdHocPhan = khoCauHoi.IdHocPhan;
      TenKhoCauHoi = khoCauHoi.TenKhoCauHoi;
      MoTa = khoCauHoi.MoTa;

      if (khoCauHoi.DsCauHoi == null) return;

      SoLuongCauHoiDe = khoCauHoi.DsCauHoi.Where(ch => ch.DoKho == DoKhoCauHoi.DE).Count();
      SoLuongCauHoiTrungBinh = khoCauHoi.DsCauHoi.Where(ch => ch.DoKho == DoKhoCauHoi.TRUNG_BINH).Count();
      SoLuongCauHoiKho = khoCauHoi.DsCauHoi.Where(ch => ch.DoKho == DoKhoCauHoi.KHO).Count();
    }
  }
}