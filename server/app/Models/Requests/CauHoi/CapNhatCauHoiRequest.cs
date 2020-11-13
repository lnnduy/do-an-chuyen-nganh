using System.Collections.Generic;
using Server.Entity;

namespace Server.Model.Request
{
  public class CapNhatCauHoiRequest
  {
    public string NoiDung { get; set; }
    public string DoKho { get; set; }
    public bool NhieuDapAn { get; set; }
    public List<long> DsDapAnCanXoa { get; set; }
    public List<DapAn> DsDapAnCanCapNhat { get; set; }
    public List<DapAnMoi> DsDapAnMoi { get; set; }
  }
}