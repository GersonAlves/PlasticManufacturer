using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;
using System.Web.Http.Cors;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class PackagingsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Packagings
        public IQueryable<Packaging> GetPackages()
        {
            return db.Packages;
        }

        // GET: api/Packagings/5
        [ResponseType(typeof(Packaging))]
        public async Task<IHttpActionResult> GetPackaging(int id)
        {
            Packaging packaging = await db.Packages.FindAsync(id);
            if (packaging == null)
            {
                return NotFound();
            }

            return Ok(packaging);
        }

        // PUT: api/Packagings/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPackaging(int id, Packaging packaging)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != packaging.Id)
            {
                return BadRequest();
            }

            db.Entry(packaging).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackagingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Packagings
        [ResponseType(typeof(Packaging))]
        public async Task<IHttpActionResult> PostPackaging(Packaging packaging)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Packages.Add(packaging);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = packaging.Id }, packaging);
        }

        // DELETE: api/Packagings/5
        [ResponseType(typeof(Packaging))]
        public async Task<IHttpActionResult> DeletePackaging(int id)
        {
            Packaging packaging = await db.Packages.FindAsync(id);
            if (packaging == null)
            {
                return NotFound();
            }

            db.Packages.Remove(packaging);
            await db.SaveChangesAsync();

            return Ok(packaging);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PackagingExists(int id)
        {
            return db.Packages.Count(e => e.Id == id) > 0;
        }
    }
}