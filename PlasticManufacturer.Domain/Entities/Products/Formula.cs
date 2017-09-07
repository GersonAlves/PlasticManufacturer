namespace PlasticManufacturer.Domain.Entities.Products
{
    public class Formula: Entity
    {
        public virtual FormulaLine FormulaLine { get; set; }
    }
}