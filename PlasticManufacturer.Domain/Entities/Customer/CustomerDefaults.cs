namespace PlasticManufacturer.Domain.Entities.Common
{
    public class CustomerDefault : Entity
    {
        public Freight Freights { get; set; }
        public bool MailingList { get; set; }
        public bool MutipleSites { get; set; }
        public string Reference { get; set; }
        public SecondLabel SecondLabel { get; set; }
        
    }
}