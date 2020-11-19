using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/hoc-phan/{idHocPhan}/ca-thi")]
  public class HocPhanCaThiController : ControllerBase
  {
    private readonly ICaThiService _caThiService;

    public HocPhanCaThiController(ICaThiService caThiService)
    {
      _caThiService = caThiService;
    }

    [HttpPost("")]
    public async Task<IActionResult> TaoCaThi(long idHocPhan, TaoCaThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.TaoCaThi(idHocPhan, request);

      return Ok(serviceResult);
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsCaThi(long idHocPhan)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.GetDsCaThi(idHocPhan);

      return Ok(serviceResult);
    }
  }

  [Authorize]
  [ApiController]
  [Route("api/ca-thi/{id}")]
  public class CaThiController : ControllerBase
  {
    private readonly ICaThiService _caThiService;

    public CaThiController(ICaThiService caThiService)
    {
      _caThiService = caThiService;
    }

    [HttpPut("")]
    public async Task<IActionResult> CapNhatCaThi(long id, TaoCaThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.CapNhatCaThi(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("")]
    public async Task<IActionResult> GetDsCaThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.XoaCaThi(id);

      return Ok(serviceResult);
    }
  }
}