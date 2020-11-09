using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
    public partial class LopHocService
    {
        public async Task<Response> XoaLopHoc(long id)
        {
            var existsLopHoc = await _lopHocRepo.FindLopHocById(id);

            if (existsLopHoc == null)
                return new Response
                {
                    StatusCode = 400,
                    Success = false,
                    Errors = new[] { "không tìm thấy lơp học" }
                };
            await _lopHocRepo.DeleteLopHoc(existsLopHoc);

            return new Response
            {
                StatusCode = 204,
                Success = true,
                Errors = null
            };
        }
    }
}