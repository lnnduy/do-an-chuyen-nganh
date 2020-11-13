using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface IHocPhanService
  {
    Response<List<HocPhan>> GetDsHocPhan();
    Task<Response<HocPhan>> GetHocPhan(long id);
    Task<Response<HocPhan>> TaoHocPhan(TaoHocPhanRequest request);
    Task<Response<HocPhan>> CapNhatHocPhan(long id, TaoHocPhanRequest request);
    Task<Response> XoaHocPhan(long id);
  }
}