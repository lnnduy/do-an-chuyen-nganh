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
  [Route("api/lop-hoc")]
  public class LopHocController : ControllerBase
  {
    private readonly ILopHocService _lopHocService;

    public LopHocController(ILopHocService lopHocService)
    {
      _lopHocService = lopHocService;
    }

    [HttpGet("")]
    public IActionResult GetDsLopHoc()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = _lopHocService.GetDsLopHoc();

      return Ok(serviceResult);
    }

    [HttpPost("")]
    public async Task<IActionResult> TaoLopHoc(TaoLopHocRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _lopHocService.TaoLopHoc(request);

      return Ok(serviceResult);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> CapNhatLopHoc(long id, TaoLopHocRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _lopHocService.CapNhatLopHoc(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> XoaLopHoc(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _lopHocService.XoaLopHoc(id);

      return Ok(serviceResult);
    }
  }
}