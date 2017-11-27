namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaorawMaterial : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RawMaterials", "Status", c => c.Boolean());
            AlterColumn("dbo.RawMaterials", "Fda", c => c.Boolean());
            AlterColumn("dbo.RawMaterials", "Hbfb", c => c.Boolean());
            AlterColumn("dbo.RawMaterials", "QCRequired", c => c.Boolean());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RawMaterials", "QCRequired", c => c.Boolean(nullable: false));
            AlterColumn("dbo.RawMaterials", "Hbfb", c => c.Boolean(nullable: false));
            AlterColumn("dbo.RawMaterials", "Fda", c => c.Boolean(nullable: false));
            AlterColumn("dbo.RawMaterials", "Status", c => c.Boolean(nullable: false));
        }
    }
}
