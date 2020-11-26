using System.Collections.Generic;
using Server.Entity;

namespace Server.Model.Response
{
  public class KetQuaResponse
  {
    public SinhVien SinhVien { get; set; }
    public CaThi CaThi { get; set; }
    public List<KetQuaCauHoi> DsKetQuaCauHoi { get; set; }

    public KetQuaResponse(SinhVien sinhVien, CaThi caThi, List<KetQuaCauHoi> dsKetQuaCauHoi)
    {
      SinhVien = sinhVien;
      CaThi = caThi;
      DsKetQuaCauHoi = dsKetQuaCauHoi;
    }
  }

  public class KetQuaCauHoi
  {
    public string NoiDung { get; set; }
    public bool TraLoiDung { get; set; }
    public List<KetQuaDapAn> DsKetQuaDapAn { get; set; }

    public KetQuaCauHoi(CauHoi cauHoi, List<KetQuaDapAn> dsKetQuaDapAn)
    {
      NoiDung = cauHoi.NoiDung;
      DsKetQuaDapAn = dsKetQuaDapAn;
    }
  }

  public class KetQuaDapAn
  {
    public string NoiDung { get; set; }
    public bool DapAnDung { get; set; }
    public bool DapAnDaChon { get; set; }
  }
}