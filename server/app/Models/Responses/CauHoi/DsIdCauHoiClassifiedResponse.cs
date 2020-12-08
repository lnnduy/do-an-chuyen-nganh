using System.Collections.Generic;
using Server.Entity;
using Server.Enum;

namespace Server.Model.Response
{
  public class DsIdCauHoiClassifiedResponse
  {
    public List<long> DsIdCauHoiDe { get; set; }
    public List<long> DsIdCauHoiTrungBinh { get; set; }
    public List<long> DsIdCauHoiKho { get; set; }

    public DsIdCauHoiClassifiedResponse()
    {
      DsIdCauHoiDe = new List<long>();
      DsIdCauHoiTrungBinh = new List<long>();
      DsIdCauHoiKho = new List<long>();
    }

    public void Add(CauHoi cauHoi)
    {
      if (
        cauHoi.DoKho == DoKhoCauHoi.DE
        && !DsIdCauHoiDe.Contains(cauHoi.Id)
      )
        DsIdCauHoiDe.Add(cauHoi.Id);
      if (
        cauHoi.DoKho == DoKhoCauHoi.TRUNG_BINH
        && !DsIdCauHoiTrungBinh.Contains(cauHoi.Id)
      )
        DsIdCauHoiTrungBinh.Add(cauHoi.Id);
      if (
        cauHoi.DoKho == DoKhoCauHoi.KHO
        && !DsIdCauHoiKho.Contains(cauHoi.Id)
      )
        DsIdCauHoiKho.Add(cauHoi.Id);
    }

    public void AddRange(List<CauHoi> dsCauHoi)
    {
      foreach (var cauHoi in dsCauHoi)
        Add(cauHoi);
    }
  }
}