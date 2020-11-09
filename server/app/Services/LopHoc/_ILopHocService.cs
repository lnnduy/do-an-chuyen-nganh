using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entities;
using Server.Model.Response;
using Server.Model.Request;

namespace Server.Service
{
    public interface ILopHocService
    {
        Response<List<LopHoc>> GetDsLopHoc();
        Task<Response<LopHoc>> TaoLopHoc(TaoLopHocRequest request);
        Task<Response<LopHoc>> CapNhatLopHoc(long id, TaoLopHocRequest request);
        Task<Response> XoaLopHoc(long id);

    }
}