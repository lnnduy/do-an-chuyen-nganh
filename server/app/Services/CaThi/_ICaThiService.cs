using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface ICaThiService
  {
    Task<Response<List<CaThi>>> GetDsCaThi(long idHocPhan);
    Task<Response<CaThi>> TaoCaThi(long idHocPhan, TaoCaThiRequest request);
    Task<Response<CaThi>> CapNhatCaThi(long id, TaoCaThiRequest request);
    Task<Response> XoaCaThi(long id);
  }
}