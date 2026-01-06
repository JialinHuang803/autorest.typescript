import "@azure-tools/typespec-client-generator-core";
import "@typespec/http";

using TypeSpec.Http;
using Azure.ClientGenerator.Core;

@service(#{ title: "Pet Store" })
namespace PetStore {
  @route("/dogs")
  namespace Dogs {
    model Pet {
      name: string;
    }
    model Test {
      name: string;
    }

    op pet(): Pet;
    @post
    op test(): Test;

    @route("/anotherDogs")
    namespace AnotherDogs {
      model Pet {
        name: string;
        type: string;
      }

      model Test {
        name: string;
      }

      op getTest(): Test;
      @post
      op pet(): Pet;
    }
  }

  @route("/cats")
  namespace Cats {
    model Pet {
      name: string;
    }

    op pet(): Pet;
  }
}
