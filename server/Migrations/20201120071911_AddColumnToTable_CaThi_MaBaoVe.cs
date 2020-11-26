using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddColumnToTable_CaThi_MaBaoVe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MaBaoVe",
                table: "CaThi",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaBaoVe",
                table: "CaThi");
        }
    }
}
