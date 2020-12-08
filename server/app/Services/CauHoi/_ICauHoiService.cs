using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface ICauHoiService
  {
    Task<Response<List<CauHoi>>> GetDsCauHoi(long idKhoCauhoi);
    Task<Response<CauHoi>> ThemCauHoiVaoKhoCauHoi(long idKhoCauHoi, TaoCauHoiRequest request);
    Task<Response<CauHoi>> CapNhatCauHoi(long id, CapNhatCauHoiRequest request);
    Task<Response> XoaCauHoi(long id);

    Response<DsIdCauHoiClassifiedResponse> GetDsIdCauHoiByDsIdKhoCauHoi(List<long> dsIdKhoCauHoi);
  }
}