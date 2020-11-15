using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class DeThiService
  {
    public async Task<Response> XoaDeThi(long id)
    {
      var deThi = await _deThiRepo.GetDeThiById(id);

      if (deThi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy đề thi" }
        };

      await _deThiRepo.DeleteDeThi(deThi);

      return new Response
      {
        StatusCode = 200,
        Success = true
      };
    }
  }
}
