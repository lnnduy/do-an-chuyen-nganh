using System.Threading.Tasks;
using Server.Entities;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
    public partial class LopHocService
    {
        public async Task<Response<LopHoc>> CapNhatLopHoc(long id, TaoLopHocRequest request)
        {
            var existsLopHoc = await _lopHocRepo.FindLopHocById(id);

            if (existsLopHoc == null)
                return new Response<LopHoc>
                {
                    StatusCode = 400,
                    Success = false,
                    Errors = new[] { "không tìm thấy lơp học" }
                };

            existsLopHoc.TenLop = request.TenLopHoc;
            var updateLopHoc = await _lopHocRepo.UpdateLopHoc(existsLopHoc);

            return new Response<LopHoc>
            {
                StatusCode = 200,
                Success = true,
                Errors = null,
                Data = updateLopHoc
            };

        }
    }
}