from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request):
    return Response({
        'name': 'Super Double T General Trading PLC API',
        'endpoints': {
            'company_overview': '/api/company/overview/',
            'product_categories': '/api/products/categories/',
            'submit_inquiry': '/api/inquiries/submit/',
        },
    })
