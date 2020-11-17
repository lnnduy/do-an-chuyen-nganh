using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/hoc-phan/{idHocPhan}/de-thi")]
  public class HocPhanDeThiController : ControllerBase
  {
    private readonly IDeThiService _deThiService;

    public HocPhanDeThiController(IDeThiService deThiService)
    {
      _deThiService = deThiService;
    }

    [HttpPost("")]
    public async Task<IActionResult> TaoDeThi(long idHocPhan, TaoDeThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _deThiService.TaoDeThi(idHocPhan, request);

      return Ok(serviceResult);
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsDeThi(long idHocPhan)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _deThiService.GetDsDeThi(idHocPhan);

      return Ok(serviceResult);
    }
  }


  [Authorize]
  [ApiController]
  [Route("api/de-thi/{id}")]
  public class DeThiController : ControllerBase
  {
    private readonly IDeThiService _deThiService;

    public DeThiController(IDeThiService deThiService)
    {
      _deThiService = deThiService;
    }

    [HttpPut("")]
    public async Task<IActionResult> CapNhatDeThi(long id, CapNhatDeThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _deThiService.CapNhatDeThi(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("")]
    public async Task<IActionResult> XoaDeThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _deThiService.XoaDeThi(id);

      return Ok(serviceResult);
    }
  }
}