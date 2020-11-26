using System.Collections.Generic;

namespace Server.Model.Response
{
  public class KetQuaCaThiResponse
  {
    public string TenDeThi { get; set; }
    public int SoCauHoi { get; set; }
    public List<KetQuaCaNhanResponse> DsKetQuaCaNhan { get; set; }
  }
}