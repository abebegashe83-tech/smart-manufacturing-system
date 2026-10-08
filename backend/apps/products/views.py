from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def product_categories(request):
    return Response({
        'categories': [
            {'name': 'Rodas Paint', 'description': 'Paint and coating solutions.'},
            {'name': 'Water Products', 'description': 'Water-related products and storage solutions.'},
            {'name': 'Metal Products', 'description': 'Fabricated and industrial metal components.'},
            {'name': 'Other Manufacturing', 'description': 'Additional industrial and manufactured products.'},
        ]
    })
