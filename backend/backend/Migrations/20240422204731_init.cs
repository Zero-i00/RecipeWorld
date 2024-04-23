using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cuisine",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cuisine", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    first_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "recipe",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    prep_time = table.Column<float>(type: "real", nullable: false),
                    cook_time = table.Column<float>(type: "real", nullable: false),
                    serving = table.Column<int>(type: "int", nullable: false),
                    proteins = table.Column<float>(type: "real", nullable: false),
                    fats = table.Column<float>(type: "real", nullable: false),
                    carbs = table.Column<float>(type: "real", nullable: false),
                    type = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    cuisine_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe", x => x.id);
                    table.ForeignKey(
                        name: "FK_recipe_cuisine_cuisine_id",
                        column: x => x.cuisine_id,
                        principalTable: "cuisine",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_recipe_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "comment",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    text = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    recipe_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.id);
                    table.ForeignKey(
                        name: "FK_comment_recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "recipe",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_comment_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ingredient",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    amount = table.Column<float>(type: "real", nullable: false),
                    unit = table.Column<int>(type: "int", nullable: false),
                    recipe_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ingredient", x => x.id);
                    table.ForeignKey(
                        name: "FK_ingredient_recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "recipe",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "recipe_instruction_step",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    step = table.Column<int>(type: "int", nullable: false),
                    text = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    recipe_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe_instruction_step", x => x.id);
                    table.ForeignKey(
                        name: "FK_recipe_instruction_step_recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "recipe",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "recipe_note",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    text = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe_note", x => x.id);
                    table.ForeignKey(
                        name: "FK_recipe_note_recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "recipe",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_comment_recipe_id",
                table: "comment",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_comment_user_id",
                table: "comment",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ingredient_recipe_id",
                table: "ingredient",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_recipe_cuisine_id",
                table: "recipe",
                column: "cuisine_id");

            migrationBuilder.CreateIndex(
                name: "IX_recipe_user_id",
                table: "recipe",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_recipe_instruction_step_recipe_id",
                table: "recipe_instruction_step",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_recipe_instruction_step_step",
                table: "recipe_instruction_step",
                column: "step",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_recipe_note_RecipeId",
                table: "recipe_note",
                column: "RecipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment");

            migrationBuilder.DropTable(
                name: "ingredient");

            migrationBuilder.DropTable(
                name: "recipe_instruction_step");

            migrationBuilder.DropTable(
                name: "recipe_note");

            migrationBuilder.DropTable(
                name: "recipe");

            migrationBuilder.DropTable(
                name: "cuisine");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
