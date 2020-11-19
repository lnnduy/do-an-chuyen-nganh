using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddColumnToTable_CaThi_TrangThai : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                table: "CaThi",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "CaThi");
        }
    }
}
