using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface IDeThiService
  {
    Task<Response<List<DeThiResponse>>> GetDsDeThi(long idHocPhan);
    Task<Response<DeThiResponse>> TaoDeThi(long idHocPhan, TaoDeThiRequest request);
    Task<Response<DeThiResponse>> CapNhatDeThi(long id, CapNhatDeThiRequest request);
    Task<Response> XoaDeThi(long id);
  }
}