using System.Collections.Generic;
using Server.Entity;

namespace Server.Model.Response
{
  public class CauHoiResponse
  {
    public long Id { get; set; }
    public string NoiDung { get; set; }
    public bool NhieuDapAn { get; set; }
    public List<DapAnResponse> DsDapAn { get; set; }

    public CauHoiResponse(CauHoi cauHoi, List<DapAnResponse> dapAn)
    {
      Id = cauHoi.Id;
      NoiDung = cauHoi.NoiDung;
      NhieuDapAn = cauHoi.NhieuDapAn;
      DsDapAn = dapAn;
    }
  }

  public class DapAnResponse
  {
    public long Id { get; set; }
    public string NoiDung { get; set; }

    public DapAnResponse(DapAn dapAn)
    {
      Id = dapAn.Id;
      NoiDung = dapAn.NoiDung;
    }
  }
}