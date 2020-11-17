using System.Collections.Generic;
using Server.Entity;
using Server.Enum;

namespace Server.Model.Response
{
  public class DeThiResponse
  {
    public long Id { get; set; }
    public long IdHocPhan { get; set; }
    public string TenDeThi { get; set; }
    public bool DeThiThu { get; set; }
    public bool SanSang { get; set; }
    public int SoLuongCauHoiDe { get; set; }
    public int SoLuongCauHoiTrungBinh { get; set; }
    public int SoLuongCauHoiKho { get; set; }
    public List<CauHoi> DsCauHoi { get; set; }

    public DeThiResponse(DeThi deThi, List<CauHoi> dsCauHoi)
    {
      Id = deThi.Id;
      IdHocPhan = deThi.IdHocPhan;
      TenDeThi = deThi.TenDeThi;
      DeThiThu = deThi.DeThiThu;
      SanSang = deThi.SanSang;

      SoLuongCauHoiDe = 0;
      SoLuongCauHoiTrungBinh = 0;
      SoLuongCauHoiKho = 0;

      foreach (var cauHoi in dsCauHoi)
      {
        SoLuongCauHoiDe += cauHoi.DoKho == DoKhoCauHoi.DE ? 1 : 0;
        SoLuongCauHoiTrungBinh += cauHoi.DoKho == DoKhoCauHoi.TRUNG_BINH ? 1 : 0;
        SoLuongCauHoiKho += cauHoi.DoKho == DoKhoCauHoi.KHO ? 1 : 0;
      }

      DsCauHoi = dsCauHoi;
    }
  }
}