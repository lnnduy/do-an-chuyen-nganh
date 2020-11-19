using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response> XoaCaThi(long id)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      await _caThiRepo.DeleteCaThi(caThi);

      return new Response
      {
        StatusCode = 204,
        Success = true
      };
    }
  }
}