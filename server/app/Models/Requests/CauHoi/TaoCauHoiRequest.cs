using System.Collections.Generic;

namespace Server.Model.Request
{
  public class TaoCauHoiRequest
  {
    public string NoiDung { get; set; }
    public string DoKho { get; set; }
    public bool NhieuDapAn { get; set; }
    public List<DapAnMoi> DsDapAn { get; set; }
  }

  public class DapAnMoi
  {
    public string NoiDung { get; set; }
    public bool DapAnDung { get; set; }
  }
}