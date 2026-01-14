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

    model Bone {
      size: string;
    }

    op pet(): Pet;
    @post
    op bone(): Bone;

    @route("/anotherDogs")
    namespace AnotherDogs {
      model Pet {
        name: string;
        type: string;
      }

      @post
      op pet(): Pet;
    }
  }

  @route("/cats")
  namespace Cats {
    model Pet {
      name: string;
    }

    model Fish {
      type: string;
    }
    op pet(): Pet;
    @post
    op fish(): Fish;
  }
}
